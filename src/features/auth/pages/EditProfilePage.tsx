import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updateSubscription } from '../store/authSlice';
import { RootState, AppDispatch } from '../../../store/store';

const subscriptionOptions = [
  { value: 'Standard', label: 'Standard', description: 'Basic features for getting started.' },
  { value: 'Pro', label: 'Pro', description: 'Advanced analytics and tools.', recommended: true },
  { value: 'Advanced', label: 'Advanced', description: 'All features, premium support.' },
];

const EditProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [subscription, setSubscription] = useState<'Standard' | 'Pro' | 'Advanced'>('Standard');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDob(user.dob);
      setSubscription(user.subscription || 'Standard');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!dob) {
      setError('Date of birth is required');
      setLoading(false);
      return;
    }

    try {
      await dispatch(updateProfile({ name, dob }));
      await dispatch(updateSubscription(subscription));
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please log in to edit your profile
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f6fa', // Soft, neutral background
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)',
          width: '100%',
          maxWidth: 560,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: 72, height: 72, fontSize: '2.5rem', bgcolor: '#2D2D42', mb: 1 }}>
          {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
        </Avatar>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 1,
            letterSpacing: '-0.5px',
            color: '#222',
            fontSize: { xs: '1.5rem', sm: '2rem' }, // Smaller than before
          }}
        >
          Edit Profile
        </Typography>
        <Divider sx={{ width: 48, my: 1, bgcolor: 'primary.main', height: 3, borderRadius: 2 }} />
  
        {error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    {error}
  </Alert>
)}

<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
  <TextField
    fullWidth
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    margin="normal"
    required
    disabled={loading}
    sx={{ borderRadius: 2, background: '#fff' }}
  />
  <TextField
    fullWidth
    label="Date of Birth"
    type="date"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
    margin="normal"
    required
    disabled={loading}
    InputLabelProps={{ shrink: true }}
    sx={{ borderRadius: 2, background: '#fff' }}
  />
  <Box sx={{ mt: 4, mb: 2 }}>
    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, color: '#222' }}>
      Subscription
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      {subscriptionOptions.map(opt => (
        <Paper
          key={opt.value}
          variant="outlined"
          onClick={() => setSubscription(opt.value as 'Standard' | 'Pro' | 'Advanced')}
          sx={{
            p: 3,
            flex: 1,
            borderColor: subscription === opt.value ? 'primary.main' : 'divider',
            background: subscription === opt.value ? 'rgba(45,45,66,0.10)' : '#f8fafc',
            boxShadow: subscription === opt.value ? 8 : 1,
            borderWidth: subscription === opt.value ? 2 : 1,
            cursor: 'pointer',
            position: 'relative',
            transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, transform 0.2s',
            '&:hover': {
              boxShadow: 12,
              borderColor: 'primary.main',
              transform: 'scale(1.04)',
              background: 'rgba(45,45,66,0.13)',
            },
            minWidth: 140,
            maxWidth: 220,
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ flexGrow: 1 }}>{opt.label}</Typography>
            {opt.recommended && (
              <Chip label="Recommended" color="primary" size="small" sx={{ ml: 1, fontWeight: 700 }} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{opt.description}</Typography>
          {subscription === opt.value && (
            <Typography variant="caption" color="primary" fontWeight={700} sx={{ mt: 1, display: 'block' }}>Selected</Typography>
          )}
        </Paper>
      ))}
    </Stack>
  </Box>
  <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 2 }}>
    <Button
      variant="outlined"
      color="primary"
      onClick={() => navigate('/profile')}
      disabled={loading}
      sx={{
        borderRadius: 2,
        px: 4,
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: 'none',
        background: '#fff',
        '&:hover': { background: '#f3f3f3' },
      }}
    >
      Cancel
    </Button>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{
        borderRadius: 2,
        px: 4,
        fontWeight: 700,
        fontSize: '1rem',
        boxShadow: 3,
        background: '#222',
        '&:hover': { background: '#111', boxShadow: 6 },
      }}
    >
      {loading ? <CircularProgress size={24} /> : 'Save Changes'}
    </Button>
  </Box>
</Box>
      </Paper>
    </Box>
  );
};

export default EditProfilePage; 