# Verification Gate

Run the relevant subset after each step. Do not fake results.

## Basic

```bash
node -v
npm -v
```

## Install

```bash
npm install
```

or if lockfile is stable:

```bash
npm ci
```

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## Lint

```bash
npm run lint
```

## Database

```bash
npm run db:migrate
npm run db:reset
```

Run only when relevant and safe.

## Smoke tests

- GET /api/health
- Login with seeded admin
- GET /api/auth/me
- Basic list endpoints after auth
- Open React route /login
- Open React route /dashboard

## Close criteria

A step can be marked done only if:

- Main acceptance criteria are met.
- Commands were run or unavailable commands were documented.
- No obvious syntax/build error remains in touched area.
- Report is written.