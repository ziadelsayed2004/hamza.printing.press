# Smoke Test Checklist

After any deployment:

- [ ] App starts without crash.
- [ ] `/api/health` returns ok.
- [ ] `/login` loads.
- [ ] Admin login works.
- [ ] `/dashboard` loads.
- [ ] Sidebar/menu appears according to permissions.
- [ ] Products list loads.
- [ ] Outlet types list loads.
- [ ] Outlets list loads.
- [ ] Invoices list loads.
- [ ] Create product with outlet type prices works.
- [ ] Create outlet works.
- [ ] Create invoice resolves correct price.
- [ ] Add payment updates remaining.
- [ ] Create inventory receipt updates stock.
- [ ] Excel export downloads.
- [ ] No database/secrets accessible from browser.