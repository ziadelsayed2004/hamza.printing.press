# Professional Material Dashboard Standard

The dashboard and shell must look like a serious business platform, not a basic student/admin template.

## Visual direction

- Clean Material Design inspired system.
- Calm neutral backgrounds.
- Strong but minimal accent color.
- High-quality cards with consistent radius, spacing, and borders.
- Typography hierarchy: page title, section title, card values, helper labels.
- RTL Arabic spacing and alignment must feel natural.
- Light mode must look premium; dark mode must not be flat black or neon-heavy.

## App shell rules

- Desktop sidebar is anchored to the right in RTL.
- Topbar fills remaining content width and respects sidebar width.
- Main content has clear max width/padding and does not start under the drawer.
- Mobile uses temporary drawer from the right.
- Navigation is grouped:
  - الرئيسية
  - الكتالوج والتسعير
  - المنافذ والتوزيع
  - الفواتير والمبيعات
  - المالية والحسابات
  - المخزون والاستلامات
  - الشحن والمتابعة
  - التقارير والتصدير
  - الإدارة والصلاحيات
- Active item must be obvious but elegant.
- Collapsed sidebar must still work with tooltips.

## Dashboard sections

1. Hero header / business overview:
   - greeting
   - current date Egypt time
   - quick actions
2. KPI strip:
   - الكتب النشطة
   - المنافذ النشطة
   - فواتير اليوم
   - إجمالي المبيعات
   - المحصل
   - المتبقي
   - تنبيهات حرجة
3. Finance overview:
   - collected balance
   - receivables
   - overdue
   - installment due soon
4. Operations overview:
   - low/negative stock
   - invoices pending shipment
   - partial shipments
   - recent inventory receipts
5. Alerts and notifications:
   - critical stock alerts
   - credit limit alerts
   - overdue invoices/installments
6. Recent activity:
   - invoices
   - payments
   - stock movements
   - user/audit activities

## Component quality rules

- Use MUI components properly: Card, Paper, Stack, Grid, Chip, Avatar, Badge, IconButton, DataGrid/Table.
- Avoid oversized empty cards.
- Avoid weak pastel cards with poor contrast.
- Avoid static fake data unless clearly labeled and removed before final.
- Every KPI should come from real API or safe empty state.
- Loading and empty states must be polished.
