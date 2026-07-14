const INCOMPLETE_SHIPPING_STATUSES = Object.freeze(['pending', 'partially_shipped']);
const RESTRICTED_INVOICE_ROLES = Object.freeze(['inventory_manager', 'shipping_user']);
const INVOICE_VISIBILITY_BYPASS_ROLES = Object.freeze([
  'super_admin',
  'admin',
  'accountant',
  'sales_staff'
]);

/**
 * Build the invoice visibility scope for a user's role names.
 * Elevated roles take precedence when a user also has a restricted role.
 */
function getInvoiceVisibilityScope(roleNames = []) {
  const roles = new Set(Array.isArray(roleNames) ? roleNames : []);
  const hasRestrictedRole = RESTRICTED_INVOICE_ROLES.some(role => roles.has(role));
  const hasBypassRole = INVOICE_VISIBILITY_BYPASS_ROLES.some(role => roles.has(role));
  const restricted = hasRestrictedRole && !hasBypassRole;

  return {
    restricted,
    allowedShippingStatuses: restricted ? INCOMPLETE_SHIPPING_STATUSES : null,
    excludeCancelled: restricted
  };
}

/**
 * Check a loaded invoice against a previously computed visibility scope.
 */
function isInvoiceVisible(invoice, scope) {
  if (!invoice) return false;
  if (!scope || !scope.restricted) return true;

  const allowedShippingStatuses = scope.allowedShippingStatuses || INCOMPLETE_SHIPPING_STATUSES;
  if (!allowedShippingStatuses.includes(invoice.shipping_status)) return false;
  if (scope.excludeCancelled && invoice.payment_status === 'cancelled') return false;

  return true;
}

module.exports = {
  INCOMPLETE_SHIPPING_STATUSES,
  RESTRICTED_INVOICE_ROLES,
  INVOICE_VISIBILITY_BYPASS_ROLES,
  getInvoiceVisibilityScope,
  isInvoiceVisible
};
