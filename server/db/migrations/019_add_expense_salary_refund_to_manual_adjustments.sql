-- Migration: 019 Add expense, salary, and refund types to manual_adjustments table check constraint

-- Disable foreign keys temporarily
PRAGMA foreign_keys = OFF;

-- 1. Rename existing table
ALTER TABLE manual_adjustments RENAME TO old_manual_adjustments;

-- 2. Create new table with updated constraints
CREATE TABLE manual_adjustments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  outlet_id INTEGER NOT NULL,
  amount REAL NOT NULL, -- positive for deposit/debit_adj/refund(receivable part), negative for withdrawal/credit_adj/expense/salary
  adjustment_type TEXT NOT NULL CHECK (adjustment_type IN ('deposit', 'withdrawal', 'credit_adjustment', 'debit_adjustment', 'expense', 'salary', 'refund')),
  notes TEXT NOT NULL,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (outlet_id) REFERENCES outlets(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Copy existing data
INSERT INTO manual_adjustments (id, outlet_id, amount, adjustment_type, notes, created_by, created_at)
SELECT id, outlet_id, amount, adjustment_type, notes, created_by, created_at
FROM old_manual_adjustments;

-- 4. Drop old table
DROP TABLE old_manual_adjustments;

-- Re-enable foreign keys
PRAGMA foreign_keys = ON;
