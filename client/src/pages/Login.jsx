import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/AuthContext';
import { APP_CONFIG } from '../config/appConfig';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  alpha
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StoreIcon from '@mui/icons-material/Store';

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      console.error(err);
      setError(err.message || 'فشل تسجيل الدخول. يرجى التحقق من اسم المستخدم وكلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <StoreIcon sx={{ fontSize: 28 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
          تسجيل الدخول
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.85rem' }}>
          {APP_CONFIG.loginSubtitle}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="اسم المستخدم"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 2.5,
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}
          </Button>
        </form>

        <Typography variant="caption" sx={{ color: 'text.disabled', mt: 3, display: 'block' }}>
          {APP_CONFIG.companyName}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
