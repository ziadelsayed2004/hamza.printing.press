const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const config = require('./server/config');
const apiRoutes = require('./server/routes');

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware configuration
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.isProduction, // Require HTTPS in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: config.env,
    storage: {
      database: fs.existsSync(config.databasePath) ? 'initialized' : 'missing',
      backups: fs.existsSync(config.backupDir) ? 'accessible' : 'inaccessible',
      uploads: fs.existsSync(config.uploadsDir) ? 'accessible' : 'inaccessible',
      exports: fs.existsSync(config.exportsDir) ? 'accessible' : 'inaccessible'
    }
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// Serve static assets from public/ folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the single page app (SPA) React frontend
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Bookstore Manager Modernized API is running. Client build is pending.');
  }
});

// Start the server if this file is run directly
if (require.main === module) {
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.env} mode`);
  });
}

module.exports = app;
