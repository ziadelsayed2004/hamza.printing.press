# API Target Map

All APIs live under `/api`.

## Core endpoints

- /api/health
- /api/auth/login
- /api/auth/logout
- /api/auth/me
- /api/users
- /api/roles
- /api/permissions
- /api/authors
- /api/products
- /api/products/:id/prices
- /api/outlet-types
- /api/outlets
- /api/invoices
- /api/invoices/:id/payments
- /api/payments
- /api/inventory/receipts
- /api/inventory/transactions
- /api/shipments
- /api/reports/*
- /api/exports/*
- /api/imports/*
- /api/audit-logs

## API standards

- JSON only for normal API responses.
- Consistent error shape.
- Validation on every mutation.
- Permission middleware on protected endpoints.
- Audit log on sensitive mutations.

## Active API correction: export only and supply-aware finance

Remove user-facing imports:

- `/api/imports/*` must be removed or return 410 during cleanup, then deleted.

Required API areas:

- `/api/payments` for collect/reverse.
- `/api/payments/:id/mark-supplied` or `/api/finance/supply` for remittance.
- `/api/finance/ledger`.
- `/api/finance/outlets/:id/statement`.
- `/api/shipments` with invoice-item partial shipment.
- `/api/exports/*` only.
