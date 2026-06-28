import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatCurrencyEGP, formatEgyptDate, formatEgyptDateTime } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import EntityDrawer from '../components/EntityDrawer';
import { FormSection } from '../components/forms/FormSection';
import { FieldGrid } from '../components/forms/FieldGrid';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  Checkbox,
  Divider,
  Tab,
  Tabs,
  Card,
  CardContent,
  Collapse,
  Autocomplete,
  Drawer
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  CloudDownload as DownloadIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Payments as PaymentsIcon,
  EventNote as EventNoteIcon,
  LocalShipping as LocalShippingIcon,
  SettingsBackupRestore as SettingsBackupRestoreIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const jordanGovernorates = [
  'عمان',
  'إربد',
  'الزرقاء',
  'البلقاء',
  'المفرق',
  'الكرك',
  'مادبا',
  'جرش',
  'عجلون',
  'الطفيلة',
  'معان',
  'العقبة'
];

export const Invoices = () => {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Primary Data States
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Metadata/Filter list options
  const [outlets, setOutlets] = useState([]);
  const [outletTypes, setOutletTypes] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  // Pagination State
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterOutletId, setFilterOutletId] = useState('');
  const [filterOutletTypeId, setFilterOutletTypeId] = useState('');
  const [filterProductId, setFilterProductId] = useState('');
  const [filterAuthorId, setFilterAuthorId] = useState('');
  const [filterGovernorate, setFilterGovernorate] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterShippingStatus, setFilterShippingStatus] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterHasRemaining, setFilterHasRemaining] = useState('');
  const [filterMinRemaining, setFilterMinRemaining] = useState('');
  const [filterMaxRemaining, setFilterMaxRemaining] = useState('');

  // Selection state for batch actions
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  // Toast Notification State
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  // Details Modal Controller
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [detailsInvoice, setDetailsInvoice] = useState(null);
  const [detailsTabValue, setDetailsTabValue] = useState(0);

  // Form state loading
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // Create/Edit Wizard Modal Controller
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [selectedFormInvoice, setSelectedFormInvoice] = useState(null);

  // Wizard Form Fields
  const [formOutletId, setFormOutletId] = useState('');
  const [formOutletTypeLabel, setFormOutletTypeLabel] = useState('');
  const [formDiscount, setFormDiscount] = useState(0);
  const [formShippingCost, setFormShippingCost] = useState(0);
  const [formPaymentType, setFormPaymentType] = useState('cash');
  const [formNotes, setFormNotes] = useState('');
  const [formItems, setFormItems] = useState([]); // [{ productId, productTitle, productCode, quantity, price, stock, stockPolicy, error }]
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formCollectionType, setFormCollectionType] = useState('none'); // 'none', 'partial', 'full'
  const [formCollectedAmount, setFormCollectedAmount] = useState(0);
  const [formSupplyStatus, setFormSupplyStatus] = useState('not_supplied'); // 'not_supplied', 'supplied'
  const [formCollectionNotes, setFormCollectionNotes] = useState('');
  const [outletBalances, setOutletBalances] = useState([]);

  // Operational Drawers Controller States
  const [openPayDrawer, setOpenPayDrawer] = useState(false);
  const [payInvoice, setPayInvoice] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('cash');
  const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);
  const [payReference, setPayReference] = useState('');
  const [payNotes, setPayNotes] = useState('');
  const [paySupplyStatus, setPaySupplyStatus] = useState('not_supplied');
  const [paySubmitting, setPaySubmitting] = useState(false);

  const [openMarkPaidDrawer, setOpenMarkPaidDrawer] = useState(false);
  const [markPaidInvoice, setMarkPaidInvoice] = useState(null);
  const [markPaidMethod, setMarkPaidMethod] = useState('cash');
  const [markPaidNotes, setMarkPaidNotes] = useState('تسوية كامل القيمة المتبقية');
  const [markPaidSubmitting, setMarkPaidSubmitting] = useState(false);

  const [openReturnDrawer, setOpenReturnDrawer] = useState(false);
  const [returnInvoice, setReturnInvoice] = useState(null);
  const [returnQuantities, setReturnQuantities] = useState({});
  const [returnReason, setReturnReason] = useState('');
  const [returnSubmitting, setReturnSubmitting] = useState(false);

  // Toast trigger
  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  // Fetch initial configuration metadata (Run once)
  const fetchMetadata = async () => {
    try {
      const outletsData = await apiClient.get('/outlets?limit=500&status=active');
      setOutlets(outletsData);

      const typesData = await apiClient.get('/outlet-types?limit=100&includeDisabled=false');
      setOutletTypes(typesData);

      const authorsData = await apiClient.get('/authors?limit=500&status=active');
      setAuthorsList(authorsData);

      const catsData = await apiClient.get('/products/categories');
      setCategoriesList(catsData);

      // Prefetch products and stock levels to make lookup fast in invoice wizard
      const productsData = await apiClient.get('/products?limit=500&status=active');
      const stockData = await apiClient.get('/inventory/stock-summary?limit=500');
      const combined = productsData.map((p) => {
        const match = stockData.find((s) => s.id === p.id);
        return {
          ...p,
          stock: match ? match.stock : 0
        };
      });
      setProductsList(combined);

      try {
        const balancesData = await apiClient.get('/finance/outlets');
        setOutletBalances(balancesData);
      } catch (err) {
        console.error('Error fetching outlet balances:', err);
      }
    } catch (err) {
      console.error('Error fetching metadata:', err);
    }
  };

  // Main fetch invoices list function
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      let query = `/invoices?limit=${limit}&offset=${offset}`;

      if (filterSearch) query += `&search=${encodeURIComponent(filterSearch)}`;
      if (filterOutletId) query += `&outletId=${filterOutletId}`;
      if (filterOutletTypeId) query += `&outletTypeId=${filterOutletTypeId}`;
      if (filterProductId) query += `&productId=${filterProductId}`;
      if (filterAuthorId) query += `&authorId=${filterAuthorId}`;
      if (filterGovernorate) query += `&governorate=${encodeURIComponent(filterGovernorate)}`;
      if (filterPaymentStatus) query += `&paymentStatus=${filterPaymentStatus}`;
      if (filterShippingStatus) query += `&shippingStatus=${filterShippingStatus}`;
      if (filterStartDate) query += `&startDate=${filterStartDate}`;
      if (filterEndDate) query += `&endDate=${filterEndDate}`;
      if (filterHasRemaining) query += `&hasRemaining=${filterHasRemaining}`;
      if (filterMinRemaining) query += `&minRemaining=${filterMinRemaining}`;
      if (filterMaxRemaining) query += `&maxRemaining=${filterMaxRemaining}`;

      const data = await apiClient.get(query);
      setInvoices(data);
      // Since backend doesn't return count directly, calculate totalCount dynamically
      // if rows length matches limit, there could be more. Otherwise offset + data.length
      setTotalCount(data.length < limit ? offset + data.length : offset + data.length + limit);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل الفواتير.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchMetadata();
  }, []);

  // Run on filter/pagination changes
  useEffect(() => {
    fetchInvoices();
  }, [limit, offset]);

  // Handle pagination navigation
  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  // Reset all advanced filter values
  const handleResetFilters = () => {
    setFilterSearch('');
    setFilterOutletId('');
    setFilterOutletTypeId('');
    setFilterProductId('');
    setFilterAuthorId('');
    setFilterGovernorate('');
    setFilterPaymentStatus('');
    setFilterShippingStatus('');
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterHasRemaining('');
    setFilterMinRemaining('');
    setFilterMaxRemaining('');
    setOffset(0);
    showToast('تمت إعادة تعيين الفلاتر.');
    setTimeout(() => fetchInvoices(), 50);
  };

  const handleApplyFilters = () => {
    setOffset(0);
    fetchInvoices();
  };

  // Handle single and multi-selection of rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInvoiceIds(invoices.map((inv) => inv.id));
    } else {
      setSelectedInvoiceIds([]);
    }
  };

  const handleSelectInvoice = (id) => {
    if (selectedInvoiceIds.includes(id)) {
      setSelectedInvoiceIds(selectedInvoiceIds.filter((x) => x !== id));
    } else {
      setSelectedInvoiceIds([...selectedInvoiceIds, id]);
    }
  };

  // Batch Export PDF method
  const handleBatchPdfExport = async () => {
    if (selectedInvoiceIds.length === 0) return;
    try {
      showToast('جاري إنشاء ملف الـ PDF...');
      const response = await apiClient.post('/invoices/export/pdf', {
        invoiceIds: selectedInvoiceIds
      }, {
        headers: { 'Accept': 'application/pdf' }
      });

      // apiClient returns body, if it's already structured as text/data or blob, handle it
      // Since custom apiClient converts JSON or text, let's invoke a direct window download trigger for safety
      // Or we can construct standard fetch to get the binary stream properly.
      const rawResponse = await fetch('/api/invoices/export/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
        body: JSON.stringify({ invoiceIds: selectedInvoiceIds })
      });
      
      if (!rawResponse.ok) throw new Error('فشل تصدير ملف الـ PDF');
      const blob = await rawResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `تقرير_الفواتير_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('تم تحميل التقرير بنجاح.');
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ أثناء تصدير ملف الـ PDF.', 'error');
    }
  };

  // Single PDF Export
  const handleSinglePdfExport = async (invoiceId) => {
    try {
      showToast('جاري تحميل الفاتورة...');
      const rawResponse = await fetch('/api/invoices/export/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
        body: JSON.stringify({ invoiceIds: [invoiceId] })
      });
      
      if (!rawResponse.ok) throw new Error('فشل تصدير الفاتورة');
      const blob = await rawResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `فاتورة_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('تم تحميل الفاتورة بنجاح.');
    } catch (err) {
      console.error(err);
      showToast('فشل تحميل ملف الـ PDF للفاتورة.', 'error');
    }
  };

  // Open Details Modal and fetch full details
  const handleOpenDetails = async (invoice) => {
    setDetailsTabValue(0);
    try {
      const data = await apiClient.get(`/invoices/${invoice.id}`);
      setDetailsInvoice(data);
      setOpenDetailsModal(true);
    } catch (err) {
      console.error(err);
      showToast('فشل تحميل تفاصيل الفاتورة.', 'error');
    }
  };

  // Operational drawer handlers
  const handleOpenPayDrawer = (invoice) => {
    setPayInvoice(invoice);
    setPayAmount(invoice.remaining_amount ? String(invoice.remaining_amount) : '');
    setPayMethod('cash');
    setPayDate(new Date().toISOString().split('T')[0]);
    setPayReference('');
    setPayNotes('');
    setPaySupplyStatus('not_supplied');
    setOpenPayDrawer(true);
  };

  const handleSubmitPayDrawer = async (e) => {
    e.preventDefault();
    if (!payInvoice || !payAmount) return;
    const amountVal = parseFloat(payAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      showToast('يرجى إدخال قيمة صحيحة وموجبة.', 'error');
      return;
    }
    if (amountVal > payInvoice.remaining_amount) {
      showToast('القيمة المدخلة تتجاوز المبلغ المتبقي للفاتورة.', 'error');
      return;
    }
    setPaySubmitting(true);
    try {
      await apiClient.post('/payments', {
        invoiceId: payInvoice.id,
        amount: amountVal,
        paymentMethod: payMethod,
        paymentDate: payDate,
        referenceNumber: payReference,
        notes: payNotes,
        supplyStatus: paySupplyStatus
      });
      showToast('تم تسجيل الدفعة بنجاح وتحديث حالة الفاتورة.');
      setOpenPayDrawer(false);
      fetchInvoices();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تسجيل الدفعة.', 'error');
    } finally {
      setPaySubmitting(false);
    }
  };

  const handleOpenMarkPaidDrawer = (invoice) => {
    setMarkPaidInvoice(invoice);
    setMarkPaidMethod('cash');
    setMarkPaidNotes('تسوية كامل القيمة المتبقية');
    setOpenMarkPaidDrawer(true);
  };

  const handleSubmitMarkPaid = async (e) => {
    e.preventDefault();
    if (!markPaidInvoice) return;
    const amountVal = markPaidInvoice.remaining_amount;
    if (amountVal <= 0) {
      showToast('الفاتورة مسددة بالكامل بالفعل.', 'warning');
      return;
    }
    setMarkPaidSubmitting(true);
    try {
      await apiClient.post('/payments', {
        invoiceId: markPaidInvoice.id,
        amount: amountVal,
        paymentMethod: markPaidMethod,
        paymentDate: new Date().toISOString().split('T')[0],
        referenceNumber: 'تسوية تلقائية',
        notes: markPaidNotes,
        supplyStatus: 'supplied'
      });
      showToast('تم تسوية الفاتورة كمدفوعة كلياً بنجاح.');
      setOpenMarkPaidDrawer(false);
      fetchInvoices();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تسوية الفاتورة.', 'error');
    } finally {
      setMarkPaidSubmitting(false);
    }
  };

  const handleOpenReturnDrawer = async (invoice) => {
    try {
      const fullInvoice = await apiClient.get(`/invoices/${invoice.id}`);
      setReturnInvoice(fullInvoice);
      // Initialize return quantities with 0 for all items
      const initialQtys = {};
      fullInvoice.items?.forEach(item => {
        initialQtys[item.id] = 0;
      });
      setReturnQuantities(initialQtys);
      setReturnReason('');
      setOpenReturnDrawer(true);
    } catch (err) {
      console.error(err);
      showToast('فشل تحميل تفاصيل الفاتورة لإنشاء المرتجع.', 'error');
    }
  };

  const handleReturnQtyChange = (itemId, val) => {
    const qty = parseInt(val, 10) || 0;
    setReturnQuantities(prev => ({
      ...prev,
      [itemId]: qty
    }));
  };

  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    if (!returnInvoice) return;

    const itemsToReturn = [];
    let hasExceeded = false;
    let exceedsMessage = '';

    for (const item of returnInvoice.items) {
      const qty = returnQuantities[item.id] || 0;
      if (qty > 0) {
        if (qty > item.remaining_returnable_quantity) {
          hasExceeded = true;
          exceedsMessage = `الكمية المدخلة للكتاب "${item.product_title}" (${qty}) تتجاوز الكمية المتاحة للإرجاع وهي ${item.remaining_returnable_quantity}.`;
          break;
        }
        itemsToReturn.push({
          invoiceItemId: item.id,
          quantity: qty
        });
      }
    }

    if (hasExceeded) {
      showToast(exceedsMessage, 'error');
      return;
    }

    if (itemsToReturn.length === 0) {
      showToast('يرجى تحديد كمية إرجاع واحدة على الأقل أكبر من الصفر.', 'warning');
      return;
    }

    setReturnSubmitting(true);
    try {
      await apiClient.post('/returns', {
        invoiceId: returnInvoice.id,
        reason: returnReason,
        items: itemsToReturn
      });
      showToast('تم تسجيل مرتجع المبيعات بنجاح وتحديث المخزون والماليات.');
      setOpenReturnDrawer(false);
      fetchInvoices();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تسجيل مرتجع المبيعات.', 'error');
    } finally {
      setReturnSubmitting(false);
    }
  };

  const handleMarkPaymentSupplied = async (paymentId) => {
    if (!window.confirm('هل أنت متأكد من تأكيد توريد هذه الدفعة للخزينة؟')) return;
    try {
      await apiClient.post(`/payments/${paymentId}/supply`);
      showToast('تم تأكيد توريد الدفعة بنجاح.');
      
      // Refresh current details invoice to update the list of payments
      if (detailsInvoice) {
        const refreshed = await apiClient.get(`/invoices/${detailsInvoice.id}`);
        setDetailsInvoice(refreshed);
      }
      fetchInvoices();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تأكيد توريد الدفعة.', 'error');
    }
  };

  // Open Create Wizard Form Modal
  const handleOpenCreateModal = () => {
    setFormMode('create');
    setSelectedFormInvoice(null);
    setFormOutletId('');
    setFormOutletTypeLabel('');
    setFormDiscount(0);
    setFormShippingCost(0);
    setFormPaymentType('cash');
    setFormNotes('');
    setFormItems([]);
    setFormCollectionType('none');
    setFormCollectedAmount(0);
    setFormSupplyStatus('not_supplied');
    setFormCollectionNotes('');
    setOpenFormModal(true);
  };

  // Open Edit Wizard Form Modal
  const handleOpenEditModal = async (invoice) => {
    try {
      const data = await apiClient.get(`/invoices/${invoice.id}`);
      setFormMode('edit');
      setSelectedFormInvoice(data);
      setFormOutletId(data.outlet_id);
      
      const outlet = outlets.find(o => o.id === data.outlet_id);
      const outletType = outletTypes.find(t => t.id === outlet?.outlet_type_id);
      setFormOutletTypeLabel(outletType ? outletType.name : '');

      setFormDiscount(data.discount);
      setFormShippingCost(data.shipping_cost);
      setFormPaymentType(data.payment_type);
      setFormNotes(data.notes || '');

      // Load products items
      const loadedItems = data.items.map(item => {
        const prod = productsList.find(p => p.id === item.product_id);
        return {
          productId: item.product_id,
          productTitle: item.product_title,
          productCode: item.product_code,
          quantity: item.quantity,
          price: item.unit_price,
          stock: prod ? prod.stock : 9999, // default if not found
          stockPolicy: prod ? prod.stockPolicy : 'ignore',
          error: ''
        };
      });
      setFormItems(loadedItems);
      setOpenFormModal(true);
    } catch (err) {
      console.error(err);
      showToast('فشل تحميل بيانات الفاتورة للتعديل.', 'error');
    }
  };

  // Outlet selection change in Create form: resolves Outlet Type and clears products prices
  const handleFormOutletChange = (outletId) => {
    setFormOutletId(outletId);
    const outlet = outlets.find((o) => o.id === outletId);
    if (outlet) {
      const type = outletTypes.find((t) => t.id === outlet.outlet_type_id);
      setFormOutletTypeLabel(type ? type.name : '');
    } else {
      setFormOutletTypeLabel('');
    }

    // Clear resolved prices of existing items when outlet changes, so we re-resolve
    setFormItems([]);
  };

  // Add Item line in wizard
  const handleAddFormItem = () => {
    if (!formOutletId) {
      showToast('يرجى اختيار المنفذ أولاً لتحديد قائمة الأسعار.', 'warning');
      return;
    }
    setFormItems([
      ...formItems,
      {
        productId: '',
        productTitle: '',
        productCode: '',
        quantity: 1,
        price: 0,
        stock: 0,
        stockPolicy: 'ignore',
        error: ''
      }
    ]);
  };

  // Remove Item line
  const handleRemoveFormItem = (index) => {
    const updated = [...formItems];
    updated.splice(index, 1);
    setFormItems(updated);
  };

  // Product selection in item line: resolves price automatically
  const handleFormItemProductChange = async (index, productObj) => {
    const updated = [...formItems];
    if (!productObj) {
      updated[index] = {
        ...updated[index],
        productId: '',
        productTitle: '',
        productCode: '',
        price: 0,
        stock: 0,
        stockPolicy: 'ignore',
        error: ''
      };
      setFormItems(updated);
      return;
    }

    // Update row details
    updated[index].productId = productObj.id;
    updated[index].productTitle = productObj.title;
    updated[index].productCode = productObj.code;
    updated[index].stock = productObj.stock;
    updated[index].stockPolicy = productObj.stockPolicy;
    updated[index].error = '';

    // Resolve price dynamically
    try {
      const resolved = await apiClient.get(
        `/product-prices/resolve?productId=${productObj.id}&outletId=${formOutletId}`
      );
      if (resolved && resolved.price !== null) {
        updated[index].price = parseFloat(resolved.price);
        updated[index].error = '';
      } else {
        updated[index].price = 0;
        updated[index].error = 'لا يوجد سعر محدد للفئة';
      }
    } catch (err) {
      console.error(err);
      updated[index].price = 0;
      updated[index].error = 'خطأ في جلب السعر';
    }
    setFormItems(updated);
  };

  // Item quantity changed
  const handleFormItemQtyChange = (index, qty) => {
    const updated = [...formItems];
    const parsedQty = parseInt(qty, 10) || 0;
    updated[index].quantity = parsedQty;

    // Validate stock quantity if policy is track
    if (updated[index].stockPolicy === 'track' && parsedQty > updated[index].stock) {
      updated[index].error = `الكمية المدخلة (${parsedQty}) تتجاوز المتوفر بالمخزن (${updated[index].stock})`;
    } else {
      // Clear stock error if it was the reason
      if (updated[index].error && updated[index].error.includes('المتوفر')) {
        updated[index].error = '';
      }
    }
    setFormItems(updated);
  };

  // Calculate Subtotal and Total for form display
  const calculateFormTotals = () => {
    const subtotal = formItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const shipping = parseFloat(formShippingCost) || 0;
    const discount = parseFloat(formDiscount) || 0;
    const total = Math.max(0, subtotal + shipping - discount);
    return {
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2)
    };
  };

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formOutletId) {
      showToast('المنفذ مطلوب.', 'error');
      return;
    }
    if (formItems.length === 0) {
      showToast('يجب إضافة مادة واحدة على الأقل في الفاتورة.', 'error');
      return;
    }

    // Check for errors in rows
    const hasRowErrors = formItems.some((item) => item.error || !item.productId);
    if (hasRowErrors) {
      showToast('يرجى تصحيح أخطاء المواد المدرجة والتأكد من تحديد الكتب.', 'error');
      return;
    }

    const totals = calculateFormTotals();
    const subtotalVal = parseFloat(totals.subtotal) || 0;
    const finalTotal = parseFloat(totals.total) || 0;
    const discountVal = parseFloat(formDiscount) || 0;

    if (discountVal > subtotalVal) {
      showToast('قيمة الخصم المباشر لا يمكن أن تتجاوز المجموع الفرعي.', 'error');
      return;
    }

    let collectedVal = 0;
    if (formMode === 'create') {
      if (formCollectionType === 'full') {
        collectedVal = finalTotal;
      } else if (formCollectionType === 'partial') {
        collectedVal = parseFloat(formCollectedAmount) || 0;
        if (collectedVal <= 0) {
          showToast('يرجى إدخال مبلغ التحصيل للدفعة الجزئية.', 'error');
          return;
        }
        if (collectedVal > finalTotal) {
          showToast('المبلغ المحصل لا يمكن أن يتجاوز المجموع الإجمالي للفاتورة.', 'error');
          return;
        }
      }
    }

    setFormSubmitting(true);
    try {
      const payload = {
        outletId: parseInt(formOutletId, 10),
        discount: discountVal,
        shippingCost: parseFloat(formShippingCost) || 0,
        paymentType: formMode === 'create' ? (formCollectionType === 'full' ? 'cash' : 'deferred') : formPaymentType,
        notes: formNotes,
        items: formItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      if (formMode === 'create') {
        payload.paymentAmount = collectedVal;
        payload.paymentSupplyStatus = formSupplyStatus;
        payload.paymentNotes = formCollectionNotes || 'تحصيل تلقائي عند إنشاء الفاتورة.';

        await apiClient.post('/invoices', payload);
        showToast('تم إنشاء الفاتورة وحسم الكميات وتسجيل التحصيل بنجاح.');
      } else {
        await apiClient.put(`/invoices/${selectedFormInvoice.id}`, payload);
        showToast('تم تحديث الفاتورة وتعديل حركة المخزون بنجاح.');
      }

      setOpenFormModal(false);
      fetchInvoices();
      // Reload balances to ensure UI is perfectly synced
      try {
        const balancesData = await apiClient.get('/finance/outlets');
        setOutletBalances(balancesData);
      } catch (err) {
        console.error('Error reloading balances:', err);
      }
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل حفظ الفاتورة.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Format Helper Status mappings
  const getPaymentStatusChip = (status) => {
    switch (status) {
      case 'paid':
        return <Chip label="مسددة" color="success" size="small" />;
      case 'unpaid':
        return <Chip label="غير مسددة" color="error" size="small" />;
      case 'partially_paid':
        return <Chip label="مسددة جزئياً" color="warning" size="small" />;
      case 'overdue':
        return <Chip label="متأخرة" color="secondary" size="small" />;
      default:
        return <Chip label={status || 'غير معروف'} size="small" />;
    }
  };

  const getShippingStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip label="قيد الانتظار" variant="outlined" color="warning" size="small" />;
      case 'shipped':
        return <Chip label="تم الشحن" color="primary" size="small" />;
      case 'partially_shipped':
        return <Chip label="شحن جزئي" variant="outlined" color="info" size="small" />;
      case 'delivered':
        return <Chip label="تم التسليم" color="success" size="small" />;
      default:
        return <Chip label={status || 'غير معروف'} size="small" />;
    }
  };

  const translatePaymentType = (type) => {
    switch (type) {
      case 'cash':
        return 'نقدي';
      case 'deferred':
        return 'آجل';
      case 'installments':
        return 'أقساط';
      case 'mixed':
        return 'مختلط';
      default:
        return type;
    }
  };

  const formTotals = calculateFormTotals();
  const selectedOutlet = outlets.find(o => o.id === formOutletId);
  const selectedOutletBalance = outletBalances.find(b => b.id === formOutletId);

  return (
    <Box sx={{ p: 1 }}>
      {/* Title & Top Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          إدارة فواتير المبيعات
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {selectedInvoiceIds.length > 0 && hasPermission('invoices.export') && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DownloadIcon />}
              onClick={handleBatchPdfExport}
            >
              تصدير المحددة ({selectedInvoiceIds.length}) PDF
            </Button>
          )}

          {hasPermission('invoices.create') && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
            >
              إنشاء فاتورة جديدة
            </Button>
          )}
        </Box>
      </Box>

      {/* Expandable Search & Filter Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon color="action" />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                خيارات البحث المتقدم والتصفية
              </Typography>
            </Box>
            <IconButton size="small">
              {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={showFilters} sx={{ mt: 2 }}>
            <Divider sx={{ my: 1.5 }} />
            <Grid container spacing={2}>
              {/* Text Search */}
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth
                  label="رقم الفاتورة، المنفذ، الملاحظات"
                  size="small"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Outlet select */}
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>المنفذ</InputLabel>
                  <Select
                    value={filterOutletId}
                    onChange={(e) => setFilterOutletId(e.target.value)}
                    label="المنفذ"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {outlets.map((o) => (
                      <MenuItem key={o.id} value={o.id}>
                        {o.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Outlet Type select */}
              <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>فئة المنفذ</InputLabel>
                  <Select
                    value={filterOutletTypeId}
                    onChange={(e) => setFilterOutletTypeId(e.target.value)}
                    label="فئة المنفذ"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {outletTypes.map((ot) => (
                      <MenuItem key={ot.id} value={ot.id}>
                        {ot.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Governorate */}
              <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>المحافظة</InputLabel>
                  <Select
                    value={filterGovernorate}
                    onChange={(e) => setFilterGovernorate(e.target.value)}
                    label="المحافظة"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {jordanGovernorates.map((gov) => (
                      <MenuItem key={gov} value={gov}>
                        {gov}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Has Remaining */}
              <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>حالة المتبقي</InputLabel>
                  <Select
                    value={filterHasRemaining}
                    onChange={(e) => setFilterHasRemaining(e.target.value)}
                    label="حالة المتبقي"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="yes">يوجد متبقي ذمة مالية</MenuItem>
                    <MenuItem value="no">مسددة بالكامل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Min Remaining */}
              <Grid item xs={12} sm={3} md={1.5}>
                <TextField
                  fullWidth
                  label="أدنى متبقي"
                  size="small"
                  type="number"
                  value={filterMinRemaining}
                  onChange={(e) => setFilterMinRemaining(e.target.value)}
                />
              </Grid>

              {/* Max Remaining */}
              <Grid item xs={12} sm={3} md={1.5}>
                <TextField
                  fullWidth
                  label="أقصى متبقي"
                  size="small"
                  type="number"
                  value={filterMaxRemaining}
                  onChange={(e) => setFilterMaxRemaining(e.target.value)}
                />
              </Grid>

              {/* Payment Status */}
              <Grid item xs={12} sm={3} md={1.5}>
                <FormControl fullWidth size="small">
                  <InputLabel>حالة الدفع</InputLabel>
                  <Select
                    value={filterPaymentStatus}
                    onChange={(e) => setFilterPaymentStatus(e.target.value)}
                    label="حالة الدفع"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="paid">مسددة</MenuItem>
                    <MenuItem value="unpaid">غير مسددة</MenuItem>
                    <MenuItem value="partially_paid">مسددة جزئياً</MenuItem>
                    <MenuItem value="overdue">متأخرة</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Shipping Status */}
              <Grid item xs={12} sm={3} md={1.5}>
                <FormControl fullWidth size="small">
                  <InputLabel>حالة الشحن</InputLabel>
                  <Select
                    value={filterShippingStatus}
                    onChange={(e) => setFilterShippingStatus(e.target.value)}
                    label="حالة الشحن"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="pending">قيد الانتظار</MenuItem>
                    <MenuItem value="shipped">تم الشحن</MenuItem>
                    <MenuItem value="partially_shipped">شحن جزئي</MenuItem>
                    <MenuItem value="delivered">تم التسليم</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Product selector */}
              <Grid item xs={12} sm={6} md={3}>
                <Autocomplete
                  options={productsList}
                  getOptionLabel={(option) => `(${option.code}) ${option.title}`}
                  size="small"
                  onChange={(e, val) => setFilterProductId(val ? val.id : '')}
                  renderInput={(params) => <TextField {...params} label="تصفية بحسب الكتاب" />}
                />
              </Grid>

              {/* Author selector */}
              <Grid item xs={12} sm={6} md={3}>
                <Autocomplete
                  options={authorsList}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  onChange={(e, val) => setFilterAuthorId(val ? val.id : '')}
                  renderInput={(params) => <TextField {...params} label="تصفية بحسب المؤلف" />}
                />
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="من تاريخ"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="إلى تاريخ"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* Filter Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2.5 }}>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ClearIcon />}
                onClick={handleResetFilters}
              >
                إلغاء التصفية
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FilterIcon />}
                onClick={handleApplyFilters}
              >
                تطبيق الفلاتر
              </Button>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        {loading ? (
          <LoadingState message="جاري تحميل قائمة الفواتير وحساب المبالغ المتبقية..." />
        ) : invoices.length === 0 ? (
          <EmptyState
            title="لا يوجد فواتير"
            description="لم يتم العثور على فواتير تطابق معايير البحث والخيارات المحددة."
          />
        ) : (
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedInvoiceIds.length > 0 &&
                        selectedInvoiceIds.length < invoices.length
                      }
                      checked={
                        invoices.length > 0 && selectedInvoiceIds.length === invoices.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>نوع الدفع</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>حالة الدفع</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>حالة الشحن</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    المجموع
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    المسدد / المتبقي
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 150 }}>
                    خيارات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((row) => {
                  const isSelected = selectedInvoiceIds.includes(row.id);
                  return (
                    <TableRow key={row.id} hover selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectInvoice(row.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {row.invoice_number}
                      </TableCell>
                      <TableCell>
                        {formatEgyptDate(row.created_at)}
                      </TableCell>
                      <TableCell>{row.outlet_name}</TableCell>
                      <TableCell>{translatePaymentType(row.payment_type)}</TableCell>
                      <TableCell>{getPaymentStatusChip(row.payment_status)}</TableCell>
                      <TableCell>{getShippingStatusChip(row.shipping_status)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                        {formatCurrencyEGP(row.total_price)}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                            {formatCurrencyEGP(row.paid_amount || 0)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                            {formatCurrencyEGP(row.remaining_amount || 0)} متبقي
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          title="عرض التفاصيل الكاملة"
                          onClick={() => handleOpenDetails(row)}
                        >
                          <VisibilityIcon size="small" />
                        </IconButton>

                        {hasPermission('payments.create') && row.remaining_amount > 0 && (
                          <IconButton
                            color="success"
                            title="تسجيل دفع (Pay)"
                            onClick={() => handleOpenPayDrawer(row)}
                          >
                            <PaymentsIcon size="small" />
                          </IconButton>
                        )}

                        {hasPermission('payments.create') && row.remaining_amount > 0 && (
                          <IconButton
                            color="success"
                            title="تعليم كمدفوعة كلياً"
                            onClick={() => handleOpenMarkPaidDrawer(row)}
                          >
                            <CheckCircleIcon size="small" />
                          </IconButton>
                        )}

                        {hasPermission('shipments.create') && (row.shipping_status === 'pending' || row.shipping_status === 'partially_shipped') && (
                          <IconButton
                            color="warning"
                            title="تسجيل شحنة (Ship)"
                            onClick={() => navigate(`/shipments?invoiceId=${row.id}&action=create`)}
                          >
                            <LocalShippingIcon size="small" />
                          </IconButton>
                        )}

                        {hasPermission('invoices.update') && (
                          <IconButton
                            color="secondary"
                            title="إنشاء مرتجع (Return)"
                            onClick={() => handleOpenReturnDrawer(row)}
                          >
                            <SettingsBackupRestoreIcon size="small" />
                          </IconButton>
                        )}

                        {hasPermission('invoices.update') && (
                          <IconButton
                            color="info"
                            title="تعديل الفاتورة"
                            onClick={() => handleOpenEditModal(row)}
                          >
                            <EditIcon size="small" />
                          </IconButton>
                        )}

                        {hasPermission('invoices.export') && (
                          <IconButton
                            color="inherit"
                            title="تحميل فاتورة PDF"
                            onClick={() => handleSinglePdfExport(row.id)}
                          >
                            <DownloadIcon size="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Custom Table Pagination */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(224, 224, 224, 1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="textSecondary">
              عدد الفواتير المعروضة بالصفحة:
            </Typography>
            <Select
              size="small"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
                setOffset(0);
              }}
              sx={{ minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" disabled={offset === 0} onClick={handlePrevPage}>
              السابق
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              السجلات ({offset + 1} - {offset + invoices.length})
            </Typography>
            <Button size="small" disabled={invoices.length < limit} onClick={handleNextPage}>
              التالي
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* --- modal details view --- */}
      <EntityDrawer
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        title={detailsInvoice ? `عرض تفاصيل الفاتورة: ${detailsInvoice.invoice_number}` : ''}
        size="large"
        actions={
          detailsInvoice && (
            <>
              {hasPermission('payments.create') && detailsInvoice.remaining_amount > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PaymentsIcon />}
                  onClick={() => {
                    setOpenDetailsModal(false);
                    handleOpenPayDrawer(detailsInvoice);
                  }}
                >
                  تسجيل دفع
                </Button>
              )}

              {hasPermission('payments.create') && detailsInvoice.remaining_amount > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    setOpenDetailsModal(false);
                    handleOpenMarkPaidDrawer(detailsInvoice);
                  }}
                >
                  إغلاق كمدفوع كلياً
                </Button>
              )}

              {hasPermission('shipments.create') && 
               (detailsInvoice.shipping_status === 'pending' || detailsInvoice.shipping_status === 'partially_shipped') && (
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<LocalShippingIcon />}
                  onClick={() => {
                    setOpenDetailsModal(false);
                    navigate(`/shipments?invoiceId=${detailsInvoice.id}&action=create`);
                  }}
                >
                  تسجيل شحنة (Ship)
                </Button>
              )}

              {hasPermission('invoices.update') && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestoreIcon />}
                  onClick={() => {
                    setOpenDetailsModal(false);
                    handleOpenReturnDrawer(detailsInvoice);
                  }}
                >
                  إنشاء مرتجع (Return)
                </Button>
              )}

              {hasPermission('invoices.export') && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleSinglePdfExport(detailsInvoice.id)}
                >
                  تنزيل PDF
                </Button>
              )}

              <Button onClick={() => setOpenDetailsModal(false)} variant="contained" color="inherit">
                إغلاق
              </Button>
            </>
          )
        }
      >
        {detailsInvoice && (
          <Box sx={{ flexGrow: 1, pr: 1, pl: 1 }}>
              {/* Header details */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">المنفذ / العميل</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{detailsInvoice.outlet_name}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">التاريخ والوقت</Typography>
                  <Typography variant="body1">{formatEgyptDateTime(detailsInvoice.created_at)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">نوع الدفع</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{translatePaymentType(detailsInvoice.payment_type)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">حالة الدفع</Typography>
                  <Box sx={{ mt: 0.5 }}>{getPaymentStatusChip(detailsInvoice.payment_status)}</Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">حالة التوزيع والشحن</Typography>
                  <Box sx={{ mt: 0.5 }}>{getShippingStatusChip(detailsInvoice.shipping_status)}</Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">تم إدخالها بواسطة</Typography>
                  <Typography variant="body1">{detailsInvoice.user_full_name || 'غير معروف'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">شروط وتفاصيل إضافية</Typography>
                  <Typography variant="body2">{detailsInvoice.notes || 'لا توجد ملاحظات إضافية'}</Typography>
                </Grid>
              </Grid>

              {/* Items Table */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>أصناف الفاتورة:</Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>اسم الكتاب</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المطلوبة</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>تم شحنها</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>خصم الصنف</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailsInvoice.items?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_title}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>{item.quantity}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={item.shipped_quantity}
                              size="small"
                              color={item.shipped_quantity >= item.quantity ? 'success' : item.shipped_quantity > 0 ? 'warning' : 'default'}
                            />
                          </TableCell>
                          <TableCell align="right">{formatCurrencyEGP(item.unit_price)}</TableCell>
                          <TableCell align="right" sx={{ color: 'error.main' }}>-{formatCurrencyEGP(item.discount || 0)}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrencyEGP(item.total_price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Totals Section */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Box sx={{ width: 300 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">المجموع الفرعي:</Typography>
                    <Typography variant="body2">{formatCurrencyEGP(detailsInvoice.subtotal || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">تكلفة الشحن:</Typography>
                    <Typography variant="body2">+{formatCurrencyEGP(detailsInvoice.shipping_cost || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">الخصم الممنوح:</Typography>
                    <Typography variant="body2" sx={{ color: 'error.main' }}>
                      -{formatCurrencyEGP(detailsInvoice.discount || 0)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع النهائي:</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {formatCurrencyEGP(detailsInvoice.total_price)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'success.main' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>المجموع المسدد:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {formatCurrencyEGP(detailsInvoice.paid_amount || 0)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'error.main' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>المبلغ المتبقي:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {formatCurrencyEGP(detailsInvoice.remaining_amount || 0)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={detailsTabValue} onChange={(e, val) => setDetailsTabValue(val)}>
                  <Tab label="سجل التحصيلات والمدفوعات" icon={<PaymentsIcon />} iconPosition="start" />
                  <Tab label="سجل حالات الفاتورة" />
                </Tabs>
              </Box>

              {/* TAB 0: Payments */}
              {detailsTabValue === 0 && (
                <Box>
                  {detailsInvoice.payments && detailsInvoice.payments.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>رقم العملية</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>تاريخ السداد</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>طريقة السداد</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>القيمة</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>حالة التوريد</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>سجلت بواسطة</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>إجراءات</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {detailsInvoice.payments.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell sx={{ fontFamily: 'monospace' }}>{p.receipt_number || p.id}</TableCell>
                              <TableCell>{formatEgyptDate(p.payment_date)}</TableCell>
                              <TableCell>{translatePaymentType(p.payment_type)}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                {formatCurrencyEGP(p.amount)}
                              </TableCell>
                              <TableCell>
                                {p.supply_status === 'supplied' ? (
                                  <Chip label="مورد" color="success" size="small" variant="outlined" />
                                ) : (
                                  <Chip label="غير مورد" color="warning" size="small" variant="outlined" />
                                )}
                              </TableCell>
                              <TableCell>{p.user_full_name || 'غير معروف'}</TableCell>
                              <TableCell>{p.notes}</TableCell>
                              <TableCell align="center">
                                {p.supply_status === 'not_supplied' && hasPermission('payments.mark_supplied') && (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleMarkPaymentSupplied(p.id)}
                                  >
                                    تأكيد التوريد
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary', p: 2, textAlign: 'center' }}>
                      لا يوجد دفعات مسددة مسجلة لهذه الفاتورة حتى الآن.
                    </Typography>
                  )}
                </Box>
              )}



              {/* TAB 2: Status History */}
              {detailsTabValue === 1 && (
                <Box>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>تاريخ الحركة</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>النوع</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>الحالة السابقة</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>الحالة الجديدة</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>السبب / الملاحظة</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailsInvoice.history.map((h) => (
                          <TableRow key={h.id}>
                            <TableCell>{formatEgyptDateTime(h.created_at)}</TableCell>
                            <TableCell>
                              {h.status_type === 'payment' ? 'دفع مالية' : 'توصيل شحن'}
                            </TableCell>
                            <TableCell>{h.status_type === 'payment' ? getPaymentStatusChip(h.old_status) : getShippingStatusChip(h.old_status)}</TableCell>
                            <TableCell>{h.status_type === 'payment' ? getPaymentStatusChip(h.new_status) : getShippingStatusChip(h.new_status)}</TableCell>
                            <TableCell>{h.user_full_name || 'غير معروف'}</TableCell>
                            <TableCell>{h.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
          </Box>
        )}
      </EntityDrawer>

      {/* --- wizard creation / edit invoice modal --- */}
      {/* --- wizard creation / edit invoice Drawer --- */}
      <EntityDrawer
        open={openFormModal}
        onClose={() => !formSubmitting && setOpenFormModal(false)}
        title={formMode === 'create' ? 'إنشاء فاتورة مبيعات جديدة' : 'تعديل فاتورة مبيعات'}
        size="large"
        loading={formSubmitting}
        actions={
          <>
            <Button onClick={() => setOpenFormModal(false)} variant="outlined" color="inherit" disabled={formSubmitting}>
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              form="invoice-editor-form"
              disabled={formSubmitting}
            >
              {formSubmitting ? 'جاري الحفظ والتحقق من الكميات...' : 'حفظ وتأكيد الفاتورة'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit} id="invoice-editor-form">
          <FormSection title="بيانات العميل والفاتورة">
            <FieldGrid columns={2}>
              {/* Outlet select */}
              <FormControl fullWidth size="small" required>
                <InputLabel>المنفذ / العميل</InputLabel>
                <Select
                  value={formOutletId}
                  onChange={(e) => handleFormOutletChange(e.target.value)}
                  label="المنفذ / العميل"
                  disabled={formMode === 'edit'} // Lock outlet on edit
                >
                  {outlets.map((o) => (
                    <MenuItem key={o.id} value={o.id}>
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Payment Status (Only on creation) */}
              {formMode === 'create' ? (
                <FormControl fullWidth size="small" required>
                  <InputLabel>حالة الدفع عند الإنشاء</InputLabel>
                  <Select
                    value={formCollectionType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormCollectionType(val);
                      if (val === 'none') {
                        setFormCollectedAmount(0);
                      } else if (val === 'full') {
                        setFormCollectedAmount(parseFloat(formTotals.total) || 0);
                      }
                    }}
                    label="حالة الدفع عند الإنشاء"
                  >
                    <MenuItem value="none">مؤجل كلياً (Fully Deferred)</MenuItem>
                    <MenuItem value="partial">مدفوع جزئياً (Partially Paid)</MenuItem>
                    <MenuItem value="full">مدفوع كلياً (Fully Paid)</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label="نوع الدفع"
                  size="small"
                  disabled
                  value={translatePaymentType(formPaymentType)}
                />
              )}

              {/* Discount */}
              <TextField
                fullWidth
                label="الخصم المباشر الممنوح"
                size="small"
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                value={formDiscount}
                onChange={(e) => setFormDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ج.م</InputAdornment>
                }}
              />

              {/* Shipping Cost */}
              <TextField
                fullWidth
                label="تكلفة وأجور الشحن والتوصيل"
                size="small"
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                value={formShippingCost}
                onChange={(e) => setFormShippingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ج.م</InputAdornment>
                }}
              />
            </FieldGrid>

            {/* Notes */}
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="ملاحظات وتفاصيل الفاتورة"
                size="small"
                multiline
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
              />
            </Box>

            {selectedOutlet && (
              <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#f8fafc', borderColor: 'primary.light' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary" display="block">فئة المنفذ</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formOutletTypeLabel || 'غير محددة'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary" display="block">المحافظة</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{selectedOutlet.governorate || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary" display="block">الهاتف</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{selectedOutlet.phone || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary" display="block">الحد الائتماني</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatCurrencyEGP(selectedOutlet.credit_limit || 0)}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary" display="block">تفاصيل العنوان</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{selectedOutlet.address_details || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary" display="block">المديونية (الرصيد المعلق الحالي)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: (selectedOutletBalance?.pending_balance || 0) > 0 ? 'warning.main' : 'success.main' }}>
                      {formatCurrencyEGP(selectedOutletBalance?.pending_balance || 0)}
                    </Typography>
                  </Grid>
                  {selectedOutlet.credit_limit > 0 && (selectedOutletBalance?.pending_balance || 0) > selectedOutlet.credit_limit && (
                    <Grid item xs={12}>
                      <Alert severity="warning" sx={{ mt: 1 }}>
                        تنبيه: مديونية هذا العميل تتجاوز الحد الائتماني المسموح به!
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            )}

            {formMode === 'create' && formCollectionType !== 'none' && (
              <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#f8fafc', borderColor: 'secondary.light' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.dark' }}>
                  تفاصيل تحصيل النقدية عند الإنشاء
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="المبلغ المحصل"
                      size="small"
                      type="number"
                      disabled={formCollectionType === 'full'}
                      inputProps={{ step: '0.01', min: '0.01' }}
                      value={formCollectionType === 'full' ? formTotals.total : formCollectedAmount}
                      onChange={(e) => setFormCollectedAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">ج.م</InputAdornment>
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel>حالة توريد النقدية</InputLabel>
                      <Select
                        value={formSupplyStatus}
                        onChange={(e) => setFormSupplyStatus(e.target.value)}
                        label="حالة توريد النقدية"
                      >
                        <MenuItem value="not_supplied">مدفوع فقط (في الخزينة الفرعية)</MenuItem>
                        <MenuItem value="supplied">مدفوع وتم توريده (إلى خزينة الشركة)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ملاحظات عملية التحصيل"
                      size="small"
                      value={formCollectionNotes}
                      onChange={(e) => setFormCollectionNotes(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            )}
          </FormSection>

          <FormSection title="المواد والكتب المباعة">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddFormItem}
              >
                إضافة مادة للفاتورة
              </Button>
            </Box>

            {formItems.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                لم يتم إضافة أي كتاب في الفاتورة حتى الآن. انقر على "إضافة مادة للفاتورة" للبدء.
              </Alert>
            ) : (
              formItems.map((item, index) => {
                const prod = productsList.find((p) => p.id === item.productId);
                return (
                  <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: '#fafbfc' }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Product select */}
                      <Grid item xs={12} sm={5}>
                        <Autocomplete
                          options={productsList}
                          getOptionLabel={(option) => `(${option.code}) ${option.title}`}
                          size="small"
                          disabled={!formOutletId}
                          value={prod || null}
                          onChange={(e, val) => handleFormItemProductChange(index, val)}
                          renderInput={(params) => <TextField {...params} required label="الكتاب" />}
                        />
                      </Grid>

                      {/* Resolved Unit Price */}
                      <Grid item xs={6} sm={2.5}>
                        <TextField
                          fullWidth
                          label="السعر للوحدة"
                          size="small"
                          disabled
                          value={item.price ? formatCurrencyEGP(item.price) : '0.00 ج.م'}
                        />
                      </Grid>

                      {/* Quantity input */}
                      <Grid item xs={6} sm={2.5}>
                        <TextField
                          fullWidth
                          label="الكمية المطلوبة"
                          size="small"
                          type="number"
                          required
                          inputProps={{ min: '1' }}
                          value={item.quantity}
                          onChange={(e) => handleFormItemQtyChange(index, e.target.value)}
                        />
                      </Grid>

                      {/* Action buttons */}
                      <Grid item xs={12} sm={2} align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {formatCurrencyEGP(item.quantity * item.price)}
                          </Typography>
                          <IconButton color="error" size="small" onClick={() => handleRemoveFormItem(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>

                      {/* Stock info & Price/Stock Error indicator */}
                      {(item.productId || item.error) && (
                        <Grid item xs={12} sx={{ '&&': { pt: 0 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                            {item.productId && (
                              <Typography variant="caption" sx={{ color: item.stockPolicy === 'track' && item.stock <= 0 ? 'error.main' : 'text.secondary', fontWeight: 500 }}>
                                المتوفر في المخزن: {item.stock} {item.stockPolicy === 'ignore' && '(مخزون لا حصر له)'}
                              </Typography>
                            )}
                            {item.error && (
                              <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                                {item.error}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                );
              })
            )}

            {/* Subtotal / Final total calculation board */}
            {formItems.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Paper variant="outlined" sx={{ p: 2, width: 300, backgroundColor: '#f8fafc' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">المجموع الفرعي:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formTotals.subtotal} ج.م</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">الشحن والتوصل:</Typography>
                    <Typography variant="body2">+{formatCurrencyEGP(formShippingCost || 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">الخصم:</Typography>
                    <Typography variant="body2" sx={{ color: 'error.main' }}>
                      -{formatCurrencyEGP(formDiscount || 0)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع الإجمالي:</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {formTotals.total} ج.م
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            )}
          </FormSection>
        </form>
      </EntityDrawer>

      {/* --- تسجيل دفعة Drawer (Pay) --- */}
      <EntityDrawer
        open={openPayDrawer}
        onClose={() => !paySubmitting && setOpenPayDrawer(false)}
        title={payInvoice ? `تسجيل دفعة جديدة للفاتورة: ${payInvoice.invoice_number}` : ''}
        size="medium"
        loading={paySubmitting}
        actions={
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenPayDrawer(false)}
              disabled={paySubmitting}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              form="add-payment-form"
              disabled={paySubmitting}
            >
              {paySubmitting ? 'جاري تسجيل الدفعة...' : 'تسجيل الدفعة وتحديث المالية'}
            </Button>
          </>
        }
      >
        {payInvoice && (
          <form onSubmit={handleSubmitPayDrawer} id="add-payment-form">
            <FormSection title="بيانات السداد والتحصيل">
              <Alert severity="info" sx={{ mb: 3 }}>
                المنفذ: {payInvoice.outlet_name} <br />
                إجمالي الفاتورة: {formatCurrencyEGP(payInvoice.total_price)} | المسدد سابقاً: {formatCurrencyEGP(payInvoice.paid_amount || 0)} | المتبقي: {formatCurrencyEGP(payInvoice.remaining_amount)}
              </Alert>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="المبلغ المحصل (ج.م)"
                  type="number"
                  required
                  inputProps={{ min: 0.01, step: 0.01, max: payInvoice.remaining_amount }}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">ج.م</InputAdornment>,
                  }}
                />
              </Box>

              <FieldGrid columns={2}>
                <FormControl fullWidth required>
                  <InputLabel>طريقة الدفع</InputLabel>
                  <Select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    label="طريقة الدفع"
                  >
                    <MenuItem value="cash">نقدي</MenuItem>
                    <MenuItem value="check">شيك</MenuItem>
                    <MenuItem value="bank_transfer">تحويل بنكي</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="تاريخ الدفع"
                  type="date"
                  required
                  value={payDate}
                  onChange={(e) => setPayDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />

                <FormControl fullWidth required>
                  <InputLabel>حالة التوريد للخزينة</InputLabel>
                  <Select
                    value={paySupplyStatus}
                    onChange={(e) => setPaySupplyStatus(e.target.value)}
                    label="حالة التوريد للخزينة"
                  >
                    <MenuItem value="not_supplied">مدفوع فقط (غير مورد بعد)</MenuItem>
                    <MenuItem value="supplied">مدفوع وتم توريده للخزينة</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="رقم الإسناد / الشيك / الحوالة"
                  value={payReference}
                  onChange={(e) => setPayReference(e.target.value)}
                />
              </FieldGrid>

              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="ملاحظات وتفاصيل السداد"
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                />
              </Box>
            </FormSection>
          </form>
        )}
      </EntityDrawer>

      {/* --- تأكيد تسوية الفاتورة كمدفوعة كلياً --- */}
      <EntityDrawer
        open={openMarkPaidDrawer}
        onClose={() => !markPaidSubmitting && setOpenMarkPaidDrawer(false)}
        title="تعليم الفاتورة كمدفوعة كلياً"
        size="small"
        loading={markPaidSubmitting}
        actions={
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenMarkPaidDrawer(false)}
              disabled={markPaidSubmitting}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              form="mark-paid-form"
              disabled={markPaidSubmitting}
            >
              {markPaidSubmitting ? 'جاري التسوية...' : 'تأكيد التسوية وسداد المتبقي'}
            </Button>
          </>
        }
      >
        {markPaidInvoice && (
          <form onSubmit={handleSubmitMarkPaid} id="mark-paid-form">
            <FormSection title="تفاصيل التسوية المالية">
              <Alert severity="warning" sx={{ mb: 3 }}>
                رقم الفاتورة: {markPaidInvoice.invoice_number} <br />
                المنفذ: {markPaidInvoice.outlet_name} <br />
                القيمة المتبقية المستحقة: <strong>{formatCurrencyEGP(markPaidInvoice.remaining_amount)}</strong>
              </Alert>

              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                سيتم تسجيل سداد فوري بقيمة كامل المتبقي (<strong>{formatCurrencyEGP(markPaidInvoice.remaining_amount)}</strong>) كدفعة <strong>نقدية موردة</strong> لإغلاق الحساب المالي للفاتورة وتحويل حالتها إلى "مسددة بالكامل".
              </Typography>

              <FieldGrid columns={1}>
                <FormControl fullWidth required>
                  <InputLabel>طريقة سداد التسوية</InputLabel>
                  <Select
                    value={markPaidMethod}
                    onChange={(e) => setMarkPaidMethod(e.target.value)}
                    label="طريقة سداد التسوية"
                  >
                    <MenuItem value="cash">نقدي</MenuItem>
                    <MenuItem value="check">شيك</MenuItem>
                    <MenuItem value="bank_transfer">تحويل بنكي</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="ملاحظات التسوية"
                  value={markPaidNotes}
                  onChange={(e) => setOpenMarkPaidDrawer(false) || setMarkPaidNotes(e.target.value)}
                />
              </FieldGrid>
            </FormSection>
          </form>
        )}
      </EntityDrawer>

      {/* --- إنشاء مرتجع Drawer --- */}
      <EntityDrawer
        open={openReturnDrawer}
        onClose={() => !returnSubmitting && setOpenReturnDrawer(false)}
        title="إنشاء مرتجع مبيعات جديد"
        subtitle={returnInvoice ? `للفاتورة رقم: ${returnInvoice.invoice_number}` : ''}
        size="medium"
        loading={returnSubmitting}
        actions={
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenReturnDrawer(false)}
              disabled={returnSubmitting}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              form="create-return-form"
              disabled={returnSubmitting}
            >
              {returnSubmitting ? 'جاري الحفظ...' : 'تأكيد وإرجاع للمخزن'}
            </Button>
          </>
        }
      >
        {returnInvoice && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitReturn();
            }}
            id="create-return-form"
          >
            <FormSection title="أصناف وكميات الفاتورة القابلة للإرجاع">
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>اسم الكتاب</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>المباع</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>المسترجع سابقاً</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المتاحة للاسترجاع</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 100 }}>كمية المرتجع الحالية</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {returnInvoice.items?.map((item) => {
                      const maxQty = item.remaining_returnable_quantity;
                      const currentVal = returnQuantities[item.id] || 0;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_title}</TableCell>
                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell align="center">{item.quantity - maxQty}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold', color: maxQty > 0 ? 'warning.main' : 'success.main' }}>{maxQty}</TableCell>
                          <TableCell align="center">
                            <TextField
                              size="small"
                              type="number"
                              value={currentVal}
                              onChange={(e) => handleReturnQtyChange(item.id, e.target.value)}
                              inputProps={{ min: 0, max: maxQty }}
                              disabled={maxQty <= 0 || returnSubmitting}
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TextField
                fullWidth
                label="سبب المرتجع / ملاحظات"
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                placeholder="يرجى كتابة سبب المرتجع هنا..."
                multiline
                rows={3}
                disabled={returnSubmitting}
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </FormSection>
          </form>
        )}
      </EntityDrawer>

      {/* Snackbar Alert Toast */}
      <Snackbar
        open={!!toastMsg}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Invoices;
