import React, { useState } from 'react';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Profile = () => {
  const { user } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('يرجى تعبئة كافة الحقول المطلوب');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('كلمة المرور الجديدة غير متطابقة مع التأكيد');
      return;
    }

    if (newPassword.length < 6) {
      setError('يجب ألا تقل كلمة المرور الجديدة عن ٦ خانات');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setSuccess('تم تغيير كلمة المرور بنجاح.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'فشل تغيير كلمة المرور. يرجى التحقق من المدخلات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
        الملف الشخصي وإعدادات الحساب
      </Typography>

      <Grid container spacing={3}>
        {/* Profile info column */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <AccountCircleIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {user?.fullName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              اسم المستخدم: {user?.username}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'right', mb: 1 }}>
              الأدوار النشطة:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'flex-start' }}>
              {user?.roles?.map((role) => (
                <Button key={role} size="small" variant="outlined" color="primary" disabled>
                  {role}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Change password column */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LockIcon color="primary" sx={{ mr: 1, ml: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                تغيير كلمة المرور
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleChangePassword}>
              <TextField
                required
                fullWidth
                type="password"
                label="كلمة المرور الحالية"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                type="password"
                label="كلمة المرور الجديدة"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                type="password"
                label="تأكيد كلمة المرور الجديدة"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                fullWidth
                sx={{ py: 1.2, fontWeight: 'bold' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'تحديث كلمة المرور'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
