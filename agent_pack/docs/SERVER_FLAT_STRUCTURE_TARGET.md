# Server Flat Structure Target

The client requested a simpler backend path. Avoid `server/src` as the long-term path.

## Target

```txt
server/
  config/
  db/
    migrations/
    seeds/
    migrate.js
    reset.js
    index.js
  middleware/
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
    shipments/
    inventory/
    reports/
    exports/
    exports/  # import modules are forbidden by current business rules
    audit/
  utils/
  routes.js
```

## Root files

```txt
app.js
package.json
client/
public/
storage/
scripts/
agent_pack/
```

## Required script targets

```json
{
  "start": "node app.js",
  "db:migrate": "node server/db/migrate.js",
  "db:reset": "node server/db/reset.js",
  "build": "npm run build --prefix client && node scripts/copy-client-build.js"
}
```

## Compatibility
Temporary compatibility files are allowed only during the refactor step, but the final code should import from `server/...`, not `server/src/...`.
