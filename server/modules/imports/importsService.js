const db = require('../../db');

/**
 * Escapes CSV values and wraps them in double quotes.
 */
function escapeCsvValue(val) {
  if (val === null || val === undefined) return '';
  let stringVal = String(val).trim();
  stringVal = stringVal.replace(/"/g, '""');
  return `"${stringVal}"`;
}

/**
 * Helper to parse CSV string into an array of arrays.
 */
function parseCsv(csvContent) {
  let content = csvContent || '';
  if (content.startsWith('\uFEFF')) {
    content = content.slice(1);
  }
  
  const result = [];
  let row = [];
  let inQuotes = false;
  let value = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          value += '"';
          i++; // Skip the escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        value += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(value);
        value = '';
      } else if (char === '\r' || char === '\n') {
        row.push(value);
        value = '';
        if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
          result.push(row);
        }
        row = [];
        if (char === '\r' && nextChar === '\n') {
          i++; // Skip \n
        }
      } else {
        value += char;
      }
    }
  }
  
  if (row.length > 0 || value !== '') {
    row.push(value);
    if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
      result.push(row);
    }
  }
  
  return result;
}

/**
 * Retrieves the template header row.
 */
function getTemplate(type) {
  let headers = [];
  if (type === 'products') {
    headers = ['title', 'code', 'category', 'status', 'stock_policy', 'authors', 'prices'];
  } else if (type === 'outlets') {
    headers = ['name', 'outlet_type_name', 'governorate', 'address_details', 'phone', 'credit_limit', 'status', 'notes'];
  } else {
    throw new Error('Unsupported template type');
  }
  return '\uFEFF' + headers.map(escapeCsvValue).join(',') + '\r\n';
}

/**
 * Creates a new import job.
 */
async function createJob({ type, filename, userId }) {
  if (!['products', 'outlets'].includes(type)) {
    throw new Error('Unsupported import type. Must be products or outlets.');
  }

  const result = await db.run(`
    INSERT INTO import_jobs (job_type, filename, status, created_by)
    VALUES (?, ?, 'pending', ?)
  `, [type, filename, userId]);

  return await db.get('SELECT * FROM import_jobs WHERE id = ?', [result.lastID]);
}

/**
 * Parses and validates CSV content, writing results to import_job_rows.
 */
async function validateAndQueueRows(jobId, type, csvContent) {
  // 1. Update job to processing
  await db.run('UPDATE import_jobs SET status = "processing", updated_at = CURRENT_TIMESTAMP WHERE id = ?', [jobId]);

  const parsed = parseCsv(csvContent);
  if (parsed.length === 0) {
    await db.run(`
      UPDATE import_jobs 
      SET status = "failed", error_message = "Empty CSV file", updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [jobId]);
    return;
  }

  const rawHeaders = parsed[0];
  const headers = rawHeaders.map(h => h.trim().toLowerCase());
  
  // Validate headers
  const required = type === 'products' ? ['title', 'code'] : ['name', 'outlet_type_name', 'governorate'];
  const missing = required.filter(r => !headers.includes(r));
  if (missing.length > 0) {
    await db.run(`
      UPDATE import_jobs 
      SET status = "failed", error_message = "Missing required columns: ${missing.join(', ')}", updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [jobId]);
    return;
  }

  // Pre-load reference lists for validation
  const existingProducts = await db.all('SELECT code FROM products');
  const existingOutlets = await db.all('SELECT name FROM outlets');
  const outletTypes = await db.all('SELECT name FROM outlet_types');

  const existingCodesSet = new Set(existingProducts.map(p => p.code.toLowerCase()));
  const existingOutletsSet = new Set(existingOutlets.map(o => o.name.toLowerCase()));
  const outletTypesSet = new Set(outletTypes.map(ot => ot.name.toLowerCase()));

  const csvCodesSet = new Set();
  const csvOutletsSet = new Set();

  let successCount = 0;
  let failedCount = 0;
  const dataRows = parsed.slice(1);

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const rowIndex = i + 1; // 1-based data row index
    const errors = [];
    const rowObj = {};

    // Map row cells to header keys
    headers.forEach((key, index) => {
      rowObj[key] = row[index] !== undefined ? row[index].trim() : '';
    });

    if (type === 'products') {
      const { title, code, category, status, stock_policy, authors, prices } = rowObj;

      if (!title) errors.push('Title is required');
      if (!code) {
        errors.push('Code is required');
      } else {
        const lowerCode = code.toLowerCase();
        if (existingCodesSet.has(lowerCode)) {
          errors.push(`Product code "${code}" already exists in the database`);
        }
        if (csvCodesSet.has(lowerCode)) {
          errors.push(`Duplicate product code "${code}" in this import file`);
        }
        csvCodesSet.add(lowerCode);
      }

      if (status && !['active', 'inactive'].includes(status)) {
        errors.push('Status must be "active" or "inactive"');
      }
      if (stock_policy && !['track', 'ignore'].includes(stock_policy)) {
        errors.push('Stock policy must be "track" or "ignore"');
      }

      if (prices) {
        // format: "Wholesale:120 | Retail:150"
        const segments = prices.split('|');
        for (const seg of segments) {
          if (!seg.trim()) continue;
          const parts = seg.split(':');
          if (parts.length !== 2) {
            errors.push(`Invalid price format: "${seg}". Must be OutletTypeName:Price`);
            continue;
          }
          const [otName, priceVal] = parts;
          if (!outletTypesSet.has(otName.trim().toLowerCase())) {
            errors.push(`Outlet type "${otName.trim()}" does not exist`);
          }
          const priceNum = parseFloat(priceVal.trim());
          if (isNaN(priceNum) || priceNum < 0) {
            errors.push(`Invalid price amount: "${priceVal.trim()}"`);
          }
        }
      }
    } else {
      // outlets import
      const { name, outlet_type_name, governorate, phone, credit_limit, status } = rowObj;

      if (!name) {
        errors.push('Name is required');
      } else {
        const lowerName = name.toLowerCase();
        if (existingOutletsSet.has(lowerName)) {
          errors.push(`Outlet name "${name}" already exists in the database`);
        }
        if (csvOutletsSet.has(lowerName)) {
          errors.push(`Duplicate outlet name "${name}" in this import file`);
        }
        csvOutletsSet.add(lowerName);
      }

      if (!outlet_type_name) {
        errors.push('Outlet type name is required');
      } else if (!outletTypesSet.has(outlet_type_name.toLowerCase())) {
        errors.push(`Outlet type "${outlet_type_name}" does not exist`);
      }

      if (!governorate) {
        errors.push('Governorate is required');
      }

      if (credit_limit) {
        const limitNum = parseFloat(credit_limit);
        if (isNaN(limitNum) || limitNum < 0) {
          errors.push('Credit limit must be a positive number');
        }
      }

      if (status && !['active', 'disabled'].includes(status)) {
        errors.push('Status must be "active" or "disabled"');
      }
    }

    const rowStatus = errors.length === 0 ? 'success' : 'error';
    if (rowStatus === 'success') {
      successCount++;
    } else {
      failedCount++;
    }

    await db.run(`
      INSERT INTO import_job_rows (job_id, row_index, status, row_data, errors)
      VALUES (?, ?, ?, ?, ?)
    `, [jobId, rowIndex, rowStatus, JSON.stringify(rowObj), JSON.stringify(errors)]);
  }

  // Determine final status: pending is our code for validation phase done, waiting commit
  await db.run(`
    UPDATE import_jobs 
    SET status = "pending", 
        total_rows = ?, 
        processed_rows = ?, 
        success_rows = ?, 
        failed_rows = ?, 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `, [dataRows.length, dataRows.length, successCount, failedCount, jobId]);
}

/**
 * Commits the valid import rows into the active tables.
 */
async function commitJob(jobId, userId) {
  const job = await db.get('SELECT * FROM import_jobs WHERE id = ?', [jobId]);
  if (!job) {
    throw new Error('Import job not found');
  }
  if (job.status !== 'pending') {
    throw new Error(`Job cannot be committed in status: ${job.status}`);
  }

  const successRows = await db.all('SELECT * FROM import_job_rows WHERE job_id = ? AND status = "success"', [jobId]);
  if (successRows.length === 0) {
    throw new Error('No successful rows to commit in this job');
  }

  // Pre-load reference maps
  const outletTypes = await db.all('SELECT id, name FROM outlet_types');
  const outletTypeMap = new Map(outletTypes.map(ot => [ot.name.toLowerCase(), ot.id]));

  await db.exec('BEGIN TRANSACTION;');
  try {
    if (job.job_type === 'products') {
      for (const row of successRows) {
        const product = JSON.parse(row.row_data);
        const { title, code, category = '', status = 'active', stock_policy = 'track', authors = '', prices = '' } = product;

        // 1. Create product
        const pr = await db.run(`
          INSERT INTO products (title, code, category, status, stock_policy)
          VALUES (?, ?, ?, ?, ?)
        `, [title.trim(), code.trim(), category.trim(), status, stock_policy]);
        const productId = pr.lastID;

        // 2. Associate Authors
        if (authors) {
          const authNames = authors.split(/[|,]/).map(a => a.trim()).filter(Boolean);
          for (const name of authNames) {
            let author = await db.get('SELECT id FROM authors WHERE LOWER(name) = ?', [name.toLowerCase()]);
            let authorId;
            if (!author) {
              const res = await db.run('INSERT INTO authors (name, status) VALUES (?, ?)', [name, 'active']);
              authorId = res.lastID;
            } else {
              authorId = author.id;
            }
            await db.run('INSERT INTO product_authors (product_id, author_id) VALUES (?, ?)', [productId, authorId]);
          }
        }

        // 3. Associate Prices
        if (prices) {
          const segments = prices.split('|');
          for (const seg of segments) {
            if (!seg.trim()) continue;
            const [otName, priceVal] = seg.split(':');
            const otId = outletTypeMap.get(otName.trim().toLowerCase());
            const priceNum = parseFloat(priceVal.trim());
            if (otId && !isNaN(priceNum)) {
              await db.run(`
                INSERT INTO product_prices (product_id, outlet_type_id, price)
                VALUES (?, ?, ?)
              `, [productId, otId, priceNum]);
            }
          }
        }
      }
    } else if (job.job_type === 'outlets') {
      for (const row of successRows) {
        const outlet = JSON.parse(row.row_data);
        const { name, outlet_type_name, governorate, address_details = '', phone = '', credit_limit = '0', status = 'active', notes = '' } = outlet;
        const otId = outletTypeMap.get(outlet_type_name.toLowerCase());
        const limitNum = parseFloat(credit_limit) || 0;

        await db.run(`
          INSERT INTO outlets (name, outlet_type_id, governorate, address_details, phone, credit_limit, status, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [name.trim(), otId, governorate.trim(), address_details.trim(), phone.trim(), limitNum, status, notes.trim()]);
      }
    }

    // Update job to completed
    await db.run('UPDATE import_jobs SET status = "completed", updated_at = CURRENT_TIMESTAMP WHERE id = ?', [jobId]);

    // Record audit entry
    await db.run(`
      INSERT INTO audit_logs (user_id, action, target_type, target_id, details)
      VALUES (?, ?, ?, ?, ?)
    `, [
      userId,
      `import_${job.job_type}`,
      'import_jobs',
      String(jobId),
      JSON.stringify({ committed_rows: successRows.length })
    ]);

    await db.exec('COMMIT;');
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }

  return { status: 'completed', committedRows: successRows.length };
}

/**
 * Generates an error CSV sheet mapping failures.
 */
async function getErrorCsv(jobId) {
  const errorRows = await db.all('SELECT * FROM import_job_rows WHERE job_id = ? AND status = "error"', [jobId]);
  if (errorRows.length === 0) {
    return '\uFEFFrow_index,errors\r\n';
  }

  const job = await db.get('SELECT job_type FROM import_jobs WHERE id = ?', [jobId]);
  let originalHeaders = [];
  if (job.job_type === 'products') {
    originalHeaders = ['title', 'code', 'category', 'status', 'stock_policy', 'authors', 'prices'];
  } else {
    originalHeaders = ['name', 'outlet_type_name', 'governorate', 'address_details', 'phone', 'credit_limit', 'status', 'notes'];
  }

  const csvHeaders = ['row_index', 'errors', ...originalHeaders];
  const headerRow = csvHeaders.map(escapeCsvValue).join(',');

  const csvRows = errorRows.map(row => {
    const data = JSON.parse(row.row_data);
    const errors = JSON.parse(row.errors).join('; ');
    const line = [
      row.row_index,
      errors,
      ...originalHeaders.map(h => data[h] || '')
    ];
    return line.map(escapeCsvValue).join(',');
  });

  return '\uFEFF' + [headerRow, ...csvRows].join('\r\n');
}

module.exports = {
  getTemplate,
  createJob,
  validateAndQueueRows,
  commitJob,
  getErrorCsv
};
