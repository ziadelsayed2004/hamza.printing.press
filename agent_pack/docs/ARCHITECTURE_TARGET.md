# Target Architecture

## Production model
Single Node.js monolith deployment:

```txt
app.js
server/
client/
public/           # React build output
storage/          # database/uploads/backups/exports, never public
scripts/
agent_pack/
```

## Request routing

- `/api/*` -> Express API routes.
- `/assets/*` and static files -> React build assets from `public/`.
- Any non-API route -> `public/index.html` for React Router.

## Backend target

```txt
server/
  config/
  db/
    migrations/
    seeds/
    migrate.js
  modules/
    auth/
    users/
    roles/
    authors/
    products/
    outlet-types/
    outlets/
    invoices/
    payments/
    inventory/
    shipments/
    reports/
    exports/
    audit/
  middleware/
  utils/
  routes.js
```

## Frontend target

```txt
client/src/
  app/
  theme/
  layouts/
  routes/
  services/
  components/
  modules/
  pages/
```

## UI stack

- React
- Vite
- Material UI
- MUI X DataGrid where useful
- RTL theme
- React Router
- Form validation with a consistent library
- Axios/fetch API client

## Design principles

- Fewer dialogs.
- Use pages/drawers for large workflows.
- Use confirmations only for destructive operations.
- Professional dashboard feel.
- Fast filters and searchable tables.
- Mobile-friendly responsive layout.