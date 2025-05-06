import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon, PersonAddAlt1 as PersonAddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { AppDispatch } from '../../../store/store';
import dapxLogo from '../../../assets/dapx-logo.png';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

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
      await dispatch(register(email, password, name, dob));
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google SSO
    console.log('Google signup');
  };

  const handleAppleSignup = () => {
    // TODO: Implement Apple SSO
    console.log('Apple signup');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{
        p: { xs: 2, sm: 4 },
        mt: 8,
        mb: 8,
        pb: 6,
        borderRadius: 5,
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)',
        background: 'linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)',
        maxWidth: 420,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <img src={dapxLogo} alt="Dapx AI Logo" style={{ width: '40%', height: '30%', marginBottom: 8, marginTop: 8}} />
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleEmailSignup} sx={{  width: '100%' }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)',
            }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)',
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)',
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)',
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)',
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3, mb: 2, fontWeight: 700, fontSize: '1.1rem',
              bgcolor: 'primary.main',
              color: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': { bgcolor: '#222', boxShadow: 4 },
              py: 1.2,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </Box>

        <Divider sx={{ my: 3, fontWeight: 700, color: 'text.secondary' }}>OR</Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />}
            onClick={handleGoogleSignup}
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              bgcolor: '#fff',
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': { bgcolor: '#f4f6fa', borderColor: 'primary.main' },
              py: 1.1,
            }}
          >
            Continue with Google
          </Button>
          <Button
            variant="outlined"
            startIcon={<AppleIcon sx={{ color: '#111' }} />}
            onClick={handleAppleSignup}
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              bgcolor: '#fff',
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': { bgcolor: '#f4f6fa', borderColor: 'primary.main' },
              py: 1.1,
            }}
          >
            Continue with Apple
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/login')}
              disabled={loading}
              sx={{ fontWeight: 700 }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage; 