# Visual QA Matrix & Design Regression Audit

This document serves as the visual quality assurance register for the Bookstore Manager Modernized system, verifying layout alignment, responsive scalability, theme readability, and RTL compatibility across different screens and modes.

---

## 1. System-wide Global Layout Matrix

| Page / Section | Viewport | Light Mode | Dark Mode | Status | Checked Components & Layout Rules |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Global Shell** (MainLayout) | Desktop | Pass | Pass | **Pass** | Sidebar drawer open, clean icons, top bar header profile dropdown, theme toggle click. |
| | Tablet | Pass | Pass | **Pass** | Sidebar collapses into mini-rail, responsive main layout padding adjustments. |
| | Mobile | Pass | Pass | **Pass** | Sidebar hidden with temporary drawer button trigger, no main header text clipping. |
| **Dashboard** | Desktop | Pass | Pass | **Pass** | Financial metrics cards layout, scrollbars visible, charts container fits viewport. |
| | Tablet | Pass | Pass | **Pass** | 2-column card stack scales correctly, latest activity list font adjustments. |
| | Mobile | Pass | Pass | **Pass** | 1-column responsive card block stack, charts scale to container size. |
| **Invoices** | Desktop | Pass | Pass | **Pass** | Invoices grid list, pagination details visible, create drawer opens on the right. |
| | Tablet | Pass | Pass | **Pass** | Filtering inputs grid wraps cleanly, action buttons remain fully visible. |
| | Mobile | Pass | Pass | **Pass** | Table horizontal scrolling active, create wizard transforms into a full-screen drawer. |
| **Payments** | Desktop | Pass | Pass | **Pass** | Ledger breakdown cards, payment entry wizard dropdown, supply status chip. |
| | Tablet | Pass | Pass | **Pass** | Filter inputs wrap cleanly, search bar width matches header line. |
| | Mobile | Pass | Pass | **Pass** | Action icons clear, text wraps without overlapping borders, full-width inputs. |
| **Shipments** | Desktop | Pass | Pass | **Pass** | Recalculate status triggers, drawer showing remaining item counts. |
| | Tablet | Pass | Pass | **Pass** | Product selection items list scales correctly, scroll container bounds active. |
| | Mobile | Pass | Pass | **Pass** | Item line cards stack responsive structure, clear select dropdown sizing. |
| **Products & Prices** | Desktop | Pass | Pass | **Pass** | Books tables list, multi-author tags, pricing edit form dialog popup. |
| | Tablet | Pass | Pass | **Pass** | Table details scale nicely, search inputs fit beside filters toolbar. |
| | Mobile | Pass | Pass | **Pass** | Actions row column stable, prices matrix dialog conforms to full-screen. |
| **Reports** | Desktop | Pass | Pass | **Pass** | Date-range filters aligned, summary totals cards, report print/export buttons. |
| | Tablet | Pass | Pass | **Pass** | Print preview bounds correct, charts fit container width. |
| | Mobile | Pass | Pass | **Pass** | Single column cards, horizontal scroll on grid lists. |
| **Audit Logs** | Desktop | Pass | Pass | **Pass** | JSON code details rendered with LTR monospace block. |
| | Tablet | Pass | Pass | **Pass** | Monospace text container bounds active, overflow text wraps correctly. |
| | Mobile | Pass | Pass | **Pass** | Full-width container scroll limits, search queries fit cleanly. |

---

## 2. Design Consistency & Defect Register

### Critical Defect Verifications:
*   **Layout Overflow:** Checked on mobile widths down to 320px. Horizontal scrolling is limited to grid tables; main sections flex and wrap cleanly.
*   **Clipped Labels:** Arabic labels are styled using responsive theme grids (`MUI Grid`) and CSS variables, preventing truncation.
*   **Sidebar Overlap:** Monitored sidebar widths. Mobile drawer shifts content and closes on overlay click.
*   **Unreadable Dark Mode:** All color variables resolve using dynamic system variables mapped in `ThemeConfig.jsx`, preventing black-on-black or white-on-white text issues.
*   **Dense Tables:** Sized to default MUI compact spacing, with distinct borders and clean hover overlays.
