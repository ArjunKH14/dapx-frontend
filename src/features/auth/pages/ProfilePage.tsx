import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Alert,
  Chip,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { updateSubscription } from '../store/authSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const subscriptionOptions = [
  { value: 'Standard', label: 'Standard', description: 'Basic features for getting started.' },
  { value: 'Pro', label: 'Pro', description: 'Advanced analytics and tools.' },
  { value: 'Advanced', label: 'Advanced', description: 'All features, premium support.' },
];

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subError, setSubError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please log in to view your profile
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubscriptionChange = async (
    _: React.MouseEvent<HTMLElement>,
    newSub: 'Standard' | 'Pro' | 'Advanced' | null
  ) => {
    if (!newSub || newSub === user.subscription) return;
    setSubError(null);
    setSubmitting(true);
    try {
      await dispatch(updateSubscription(newSub));
    } catch (err) {
      setSubError('Failed to update subscription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: 6, mb: 6, maxWidth: 540, mx: 'auto', borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2D2D42 60%, #4f5b8a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px 0 rgba(31,38,135,0.10)',
            mb: 2,
          }}>
            <Avatar
              sx={{ width: 100, height: 100, fontSize: '3rem', bgcolor: '#2D2D42', border: '4px solid #fff' }}
            >
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </Avatar>
          </Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-1px', textAlign: 'center' }}>
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1, fontSize: '1.1rem', textAlign: 'center' }}>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3} alignItems="stretch">
          {/* <Grid item xs={12} sm={6}>
           */}
            <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ background: '#f7fafc', borderRadius: 2, p: 2, height: '100%' }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
                Personal Information
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Name:</strong> {user.name}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
              <Typography variant="body2"><strong>Date of Birth:</strong> {formatDate(user.dob)}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ background: '#f7fafc', borderRadius: 2, p: 2, height: '100%' }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
                Account Information
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>User ID:</strong> {user.id}</Typography>
              <Typography variant="body2"><strong>Member Since:</strong> {new Date().toLocaleDateString()}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 1 }}>
            Subscription
          </Typography>
          <Chip
            label={user.subscription || 'Standard'}
            color={user.subscription === 'Pro' ? 'primary' : user.subscription === 'Advanced' ? 'secondary' : 'default'}
            sx={{ ml: 1, fontWeight: 700, fontSize: '1rem', px: 2, bgcolor: user.subscription === 'Standard' ? '#e0e0e0' : undefined }}
          />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4, width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ width: { xs: '100%', sm: 'auto' }, fontWeight: 700 }}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate('/edit-profile')}
            sx={{ width: { xs: '100%', sm: 'auto' }, fontWeight: 700 }}
          >
            Edit Profile
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage; 