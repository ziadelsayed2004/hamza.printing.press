import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import { formatEgyptDateTime } from '../utils/formatters';
import Breadcrumbs from '../components/Breadcrumbs';
import { APP_CONFIG } from '../config/appConfig';
import { useColorMode } from '../theme/ThemeConfig';
import { t } from '../locales/t';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Chip,
  Avatar,
  Tooltip,
  ListSubheader,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  Create as CreateIcon,
  Book as BookIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  LocalShipping as LocalShippingIcon,
  Assessment as AssessmentIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  History as HistoryIcon,
  ExitToApp as ExitToAppIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  MenuOpen as MenuOpenIcon,
  Notifications as NotificationsIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import './MainLayout.css';

const DRAWER_WIDTH = 270;
const DRAWER_COLLAPSED_WIDTH = 72;

export const MainLayout = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const currentDrawerWidth = collapsed && !isMobile ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  // ── Notifications Fetching ──
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const counts = await apiClient.get('/notifications/counts');
      setUnreadCount(counts.unread || 0);
      const list = await apiClient.get('/notifications?limit=5');
      setNotifications(list || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user]);

  const handleMarkAsRead = async (id, event) => {
    if (event) event.stopPropagation();
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      await fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleResolve = async (id, event) => {
    if (event) event.stopPropagation();
    try {
      await apiClient.patch(`/notifications/${id}/resolve`);
      await fetchNotifications();
    } catch (err) {
      console.error('Error resolving notification:', err);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <ErrorIcon className="main-layout__icon-btn" fontSize="small" style={{ color: '#ef4444' }} />;
      case 'warning': return <WarningIcon className="main-layout__icon-btn" fontSize="small" style={{ color: '#f59e0b' }} />;
      case 'success': return <CheckCircleIcon className="main-layout__icon-btn" fontSize="small" style={{ color: '#10b981' }} />;
      case 'info':
      default: return <InfoIcon className="main-layout__icon-btn" fontSize="small" style={{ color: '#3b82f6' }} />;
    }
  };

  // ── Page Titles ──
  const getPageTitle = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames.length === 0) return t('nav.dashboard');
    const lastSegment = pathnames[pathnames.length - 1];
    const routeTitles = {
      'profile': t('nav.profile'),
      'users': t('nav.users'),
      'outlet-types': t('nav.outletTypes'),
      'outlets': t('nav.outlets'),
      'authors': t('nav.authors'),
      'products': t('nav.products'),
      'inventory': t('nav.inventory'),
      'invoices': t('nav.invoices'),
      'payments': t('nav.payments'),
      'finance': t('nav.finance'),
      'shipments': t('nav.shipments'),
      'reports': t('nav.reports'),
      'imports': t('nav.imports'),
      'exports': t('nav.exports'),
      'audit': t('nav.audit'),
      'notifications': t('nav.notifications')
    };
    return routeTitles[lastSegment] || lastSegment;
  };

  // ── Event Handlers ──
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotifyClick = (event) => setNotifyAnchorEl(event.currentTarget);
  const handleNotifyClose = () => setNotifyAnchorEl(null);
  const openMenu = Boolean(anchorEl);
  const openNotify = Boolean(notifyAnchorEl);

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // ── Sidebar Menu Sections ──
  const menuSections = [
    {
      titleKey: 'nav.main',
      title: 'الرئيسية',
      items: [
        { textKey: 'nav.dashboard', text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/', permission: null }
      ]
    },
    {
      titleKey: 'nav.catalog',
      title: 'الكتالوج والتسعير',
      items: [
        { textKey: 'nav.products', text: 'الكتب والمنتجات', icon: <BookIcon />, path: '/products', permission: 'products.view' },
        { textKey: 'nav.authors', text: 'المؤلفين', icon: <CreateIcon />, path: '/authors', permission: 'authors.view' },
        { textKey: 'nav.outletTypes', text: 'فئات المنافذ', icon: <CategoryIcon />, path: '/outlet-types', permission: 'outlet_types.view' }
      ]
    },
    {
      titleKey: 'nav.distribution',
      title: 'المنافذ والتوزيع',
      items: [
        { textKey: 'nav.outlets', text: 'المنافذ والفروع', icon: <StoreIcon />, path: '/outlets', permission: 'outlets.view' }
      ]
    },
    {
      titleKey: 'nav.sales',
      title: 'الفواتير والمبيعات',
      items: [
        { textKey: 'nav.invoices', text: 'الفواتير', icon: <ReceiptIcon />, path: '/invoices', permission: 'invoices.view' }
      ]
    },
    {
      titleKey: 'nav.financeSection',
      title: 'المالية والحسابات',
      items: [
        { textKey: 'nav.payments', text: 'المدفوعات', icon: <PaymentIcon />, path: '/payments', permission: 'payments.view' },
        { textKey: 'nav.finance', text: 'الخزينة والمالية', icon: <WalletIcon />, path: '/finance', permission: 'finance.view' }
      ]
    },
    {
      titleKey: 'nav.inventorySection',
      title: 'المخزون',
      items: [
        { textKey: 'nav.inventory', text: 'المخزون والوارد', icon: <InventoryIcon />, path: '/inventory', permission: 'inventory.view' }
      ]
    },
    {
      titleKey: 'nav.shippingSection',
      title: 'الشحن',
      items: [
        { textKey: 'nav.shipments', text: 'الشحنات', icon: <LocalShippingIcon />, path: '/shipments', permission: 'shipments.view' }
      ]
    },
    {
      titleKey: 'nav.reportsSection',
      title: 'التقارير والتصدير',
      items: [
        { textKey: 'nav.reports', text: 'التقارير', icon: <AssessmentIcon />, path: '/reports', permission: 'reports.view' },
        { textKey: 'nav.imports', text: 'استيراد البيانات', icon: <CloudUploadIcon />, path: '/imports', permission: 'imports.run' },
        { textKey: 'nav.exports', text: 'تصدير البيانات', icon: <CloudDownloadIcon />, path: '/exports', permission: 'exports.run' }
      ]
    },
    {
      titleKey: 'nav.managementSection',
      title: 'الإدارة',
      items: [
        { textKey: 'nav.users', text: 'المستخدمين والأدوار', icon: <PeopleIcon />, path: '/users', permission: 'users.view' },
        { textKey: 'nav.audit', text: 'سجل العمليات', icon: <HistoryIcon />, path: '/audit', permission: 'audit.view' }
      ]
    }
  ];

  // ── Render Menu Items ──
  const renderMenuItems = (isMobileLayout = false) => {
    const isCollapsedView = !isMobileLayout && collapsed;

    return menuSections.map((section) => {
      const visibleItems = section.items.filter(
        item => !item.permission || hasPermission(item.permission)
      );
      if (visibleItems.length === 0) return null;

      return (
        <List
          key={section.titleKey}
          disablePadding
          className="sidebar-menu-list"
          subheader={
            !isCollapsedView && (
              <ListSubheader className="sidebar-subheader">
                {t(section.titleKey)}
              </ListSubheader>
            )
          }
        >
          {isCollapsedView && <Divider className="sidebar-divider" />}

          {visibleItems.map((item) => {
            const isSelected = location.pathname === item.path;

            const buttonContent = (
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobileLayout) setMobileOpen(false);
                }}
                selected={isSelected}
                className={`sidebar-item-btn ${isCollapsedView ? 'sidebar-item-btn--collapsed' : 'sidebar-item-btn--expanded'}`}
              >
                <ListItemIcon className="sidebar-item-icon">
                  {item.icon}
                </ListItemIcon>
                {!isCollapsedView && (
                  <ListItemText
                    primary={t(item.textKey)}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem key={item.textKey} disablePadding style={{ display: 'block' }}>
                {isCollapsedView ? (
                  <Tooltip title={t(item.textKey)} placement="left">
                    {buttonContent}
                  </Tooltip>
                ) : (
                  buttonContent
                )}
              </ListItem>
            );
          })}
        </List>
      );
    });
  };

  // ── Drawer Content ──
  const drawerContent = (isMobileLayout = false) => {
    const isCollapsedView = !isMobileLayout && collapsed;

    return (
      <Box className="main-layout__drawer-container">
        {/* ── Sidebar Header ── */}
        <Box
          className={`sidebar-header ${isCollapsedView ? 'sidebar-header--collapsed' : 'sidebar-header--expanded'}`}
        >
          <Box className="sidebar-logo-box">
            <StoreIcon style={{ fontSize: 20 }} />
          </Box>
          {!isCollapsedView && (
            <Box className="sidebar-brand-container">
              <Typography
                variant="subtitle1"
                noWrap
                className="sidebar-brand-title"
              >
                {t('app.title')}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                className="sidebar-brand-subtitle"
              >
                {t('app.subtitle')}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />

        {/* ── Profile Card ── */}
        <Box
          onClick={() => {
            navigate('/profile');
            if (isMobileLayout) setMobileOpen(false);
          }}
          className="profile-card"
        >
          <Avatar className="main-layout__avatar">
            {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </Avatar>
          {!isCollapsedView && (
            <Box className="profile-card__info">
              <Typography variant="body2" noWrap className="profile-card__name">
                {user?.fullName || user?.username}
              </Typography>
              <Typography variant="caption" noWrap className="profile-card__role">
                {user?.roles?.join(' • ') || t('common.user')}
              </Typography>
            </Box>
          )}
        </Box>

        {/* ── Menu Items ── */}
        <Box className="sidebar-menu-wrapper">
          {renderMenuItems(isMobileLayout)}
        </Box>

        {/* ── Collapse Toggle (desktop only) ── */}
        {!isMobileLayout && (
          <>
            <Divider />
            <Box className="sidebar-toggle-container">
              <Tooltip title={collapsed ? t('nav.expandMenu') : t('nav.collapseMenu')} placement="left">
                <IconButton
                  onClick={() => setCollapsed(!collapsed)}
                  size="small"
                  className="main-layout__icon-btn"
                >
                  <MenuOpenIcon
                    style={{
                      transform: collapsed ? 'scaleX(1)' : 'scaleX(-1)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box className="main-layout">
      <CssBaseline />

      {/* ══════ Top AppBar ══════ */}
      <AppBar
        position="fixed"
        elevation={0}
        className="main-layout__appbar"
        style={{
          width: isMobile ? '100%' : `calc(100% - ${currentDrawerWidth}px)`,
          left: 0,
        }}
      >
        <Toolbar className="main-layout__toolbar">
          {/* Mobile hamburger menu */}
          <IconButton
            color="inherit"
            aria-label={t('nav.openMenu')}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Page Title */}
          <Typography
            variant="h6"
            noWrap
            component="h1"
            className="main-layout__title"
          >
            {getPageTitle()}
          </Typography>

          {/* ── TopBar Actions ── */}

          {/* Theme Toggle */}
          <Tooltip title={mode === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}>
            <IconButton
              onClick={toggleColorMode}
              className="main-layout__icon-btn"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Notifications Bell */}
          <Tooltip title={t('nav.notifications')}>
            <IconButton
              onClick={handleNotifyClick}
              className="main-layout__icon-btn"
              aria-controls={openNotify ? 'notifications-menu' : undefined}
              aria-haspopup="true"
            >
              <Badge
                badgeContent={unreadCount}
                color="error"
                className="main-layout__badge"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Account Avatar */}
          <Tooltip title={t('auth.accountOptions')}>
            <IconButton
              onClick={handleMenuClick}
              size="small"
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
            >
              <Avatar className="main-layout__avatar">
                {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* ── Account Menu ── */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            slotProps={{
              paper: {
                elevation: 4,
                className: "account-menu-paper"
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <Box className="user-menu-header">
              <Typography variant="subtitle2" className="user-menu-header__name">
                {user?.fullName || user?.username}
              </Typography>
              <Typography variant="caption" className="user-menu-header__role">
                {user?.roles?.join(' • ')}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => navigate('/profile')} className="user-menu-item">
              <PersonIcon fontSize="small" className="main-layout__icon-btn" />
              {t('nav.profile')}
            </MenuItem>
            <MenuItem onClick={() => navigate('/notifications')} className="user-menu-item">
              <NotificationsIcon fontSize="small" className="main-layout__icon-btn" />
              {t('nav.notifications')}
              {unreadCount > 0 && (
                <Chip label={unreadCount} size="small" color="error" className="user-menu-chip" />
              )}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} className="user-menu-item user-menu-item--logout">
              <ExitToAppIcon fontSize="small" />
              {t('nav.logout')}
            </MenuItem>
          </Menu>

          {/* ── Notifications Dropdown ── */}
          <Menu
            anchorEl={notifyAnchorEl}
            id="notifications-menu"
            open={openNotify}
            onClose={handleNotifyClose}
            slotProps={{
              paper: {
                elevation: 4,
                className: "notify-menu-paper"
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <Box className="notify-header">
              <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                {t('nav.notifications')}
              </Typography>
              {unreadCount > 0 && (
                <Chip label={`${unreadCount} ${t('common.new')}`} size="small" color="error" className="notify-chip" />
              )}
            </Box>
            <Divider />
            {notifications.length === 0 ? (
              <Box className="notify-empty">
                <NotificationsIcon style={{ fontSize: 40, color: 'text.disabled', marginBottom: '8px' }} />
                <Typography variant="body2" className="notify-empty__text">
                  {t('notifications.noNotifications')}
                </Typography>
              </Box>
            ) : (
              notifications.map((n) => (
                <Box key={n.id}>
                  <Box
                    className={`notification-item ${n.status === 'unread' ? 'notification-item--unread' : ''}`}
                    onClick={() => {
                      if (n.action_url) {
                        navigate(n.action_url);
                        handleNotifyClose();
                      }
                    }}
                  >
                    <Box style={{ marginTop: '2px', flexShrink: 0 }}>
                      {getSeverityIcon(n.severity)}
                    </Box>
                    <Box style={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap className="notification-item__title">
                        {n.title}
                      </Typography>
                      <Typography variant="caption" className="notification-item__message">
                        {n.message}
                      </Typography>
                      <Typography variant="caption" className="notification-item__time">
                        {formatEgyptDateTime(n.created_at)}
                      </Typography>

                      <Box className="notification-item__actions" onClick={(e) => e.stopPropagation()}>
                        {n.status === 'unread' && (
                          <Button
                            size="small"
                            variant="text"
                            onClick={(e) => handleMarkAsRead(n.id, e)}
                            style={{ fontSize: '0.7rem', padding: '0 4px', minWidth: 0 }}
                          >
                            {t('notifications.markAsRead')}
                          </Button>
                        )}
                        {n.status !== 'resolved' && (
                          <Button
                            size="small"
                            variant="text"
                            color="success"
                            onClick={(e) => handleResolve(n.id, e)}
                            style={{ fontSize: '0.7rem', padding: '0 4px', minWidth: 0 }}
                          >
                            {t('notifications.resolve')}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))
            )}
            <Box className="notify-footer">
              <Button
                size="small"
                fullWidth
                onClick={() => { navigate('/notifications'); handleNotifyClose(); }}
                style={{ borderRadius: '8px', padding: '8px 0' }}
              >
                {t('notifications.viewAll')}
              </Button>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ══════ Sidebar Drawer ══════ */}
      <Box
        component="nav"
        className="main-layout__sidebar-nav"
        style={{
          width: isMobile ? 'auto' : currentDrawerWidth
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            style: {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH
            }
          }}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {drawerContent(true)}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          anchor="left"
          PaperProps={{
            style: {
              boxSizing: 'border-box',
              width: currentDrawerWidth,
              borderLeft: '1px solid var(--border-color)',
              borderRight: 'none',
              overflowX: 'hidden'
            }
          }}
          sx={{
            display: { xs: 'none', md: 'block' }
          }}
          open
        >
          {drawerContent(false)}
        </Drawer>
      </Box>

      {/* ══════ Main Content ══════ */}
      <Box
        component="main"
        className="main-layout__content-wrapper"
        style={{
          width: isMobile ? '100%' : `calc(100% - ${currentDrawerWidth}px)`,
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Box className="main-layout__content">
          <Breadcrumbs />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
