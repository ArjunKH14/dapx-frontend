import React, { useEffect, useRef, useState } from 'react';
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
import { Google as GoogleIcon, Apple as AppleIcon, LockOutlined as LockIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState, AppDispatch } from '../../../store/store';
import dapxLogo from '../../../assets/dapx-logo.png';
import { GoogleLogin, GoogleLoginProps } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
// import { GoogleLogin, GoogleLoginRenderProps } from 'react-google-login';
import axios from 'axios';




const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const divRef = useRef(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);


  useEffect(() => {
    if (divRef.current) {
       // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
           console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
           console.log(response.credential)
            const res = await fetch('http://localhost:3000/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_token: response.credential }),
            });
            const data = await res.json();
            // Handle login success (store token, redirect, etc.)
            console.log('Backend response:', data);
          } catch (err) {
            console.error('Google login failed:', err);
          }
        },
      });
      // @ts-ignore
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_blue',
        size: 'medium',
        type: 'standard',
        text: 'continue_with',
      });
    }
  }, [divRef.current]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password));
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

 




//   const handleGoogleLogin = () => {
//     console.log("Button clicked")
//     // @ts-ignore
//     if (window.google) {
//       console.log("Google API loaded")
// // @ts-ignore
//       window.google.accounts.id.initialize({
//         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
//         callback: async (response: any) => {
//           try {
//            console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
//            console.log(response.credential)
//             const res = await fetch('http://localhost:3000/auth/google', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ id_token: response.credential }),
//             });
//             const data = await res.json();
//             // Handle login success (store token, redirect, etc.)
//             console.log('Backend response:', data);
//           } catch (err) {
//             console.error('Google login failed:', err);
//           }
//         },
//       });
//       // @ts-ignore
//       window.google.accounts.id.cancel();
//       // @ts-ignore
//       window.google.accounts.id.prompt();
//     } else {
//       console.error('Google API not loaded');
//     }
//   };
//   const handleGoogleLogin = () => {
//     // @ts-ignore
//     if (window.google && window.google.accounts && window.google.accounts.oauth2) {
//         // @ts-ignore
//       const tokenClient = window.google.accounts.oauth2.initTokenClient({
//         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
//         scope: 'openid email profile',
//         // @ts-ignore
//         callback: async (tokenResponse) => {
//           console.log('Google Access Token:', tokenResponse.access_token);
  
//           // Optional: Get user info from Google
//           const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           });
//           const userInfo = await userRes.json();
//           console.log('User Info:', userInfo);
//           console.log(tokenResponse.credential)
  
//           // Send token to backend
//           await fetch('http://localhost:3000/api/auth/google', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id_token: tokenResponse.access_token }),
//           });
//         },
//       });
  
//       tokenClient.requestAccessToken(); // 👈 This shows the Google popup
//     } else {
//       console.error('Google API not loaded');
//     }
//   };
  
// const handleGoogleLogin = useGoogleLogin({
//     flow: 'auth-code',
//     onSuccess: async (codeResponse) => {
//       console.log('Auth code:', codeResponse); // Send this to backend
//       await fetch('http://localhost:3000/api/auth/google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id_token: codeResponse.code }),
//       });
//     },
//     onError: (err) => {
//       console.error('Google login failed:', err);
//     },
//   });
  const handleAppleLogin = () => {
    // TODO: Implement Apple SSO
    console.log('Apple login');
  };
 
  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{
        p: { xs: 2, sm: 4 },
        mt: 8,
        borderRadius: 5,
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)',
        background: 'linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)',
        maxWidth: 420,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src={dapxLogo} alt="Dapx AI Logo" style={{ width: '40%', height: '30%', marginBottom: 8, marginTop: 8 }} />
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleEmailLogin} sx={{ width: '100%' }}>
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
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>

        <Divider sx={{ my: 3, fontWeight: 700, color: 'text.secondary' }}>OR</Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

 
          <Button
            variant="outlined"
            ref={divRef}
            startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />}
            // onClick={handleGoogleLogin}
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
            onClick={handleAppleLogin}
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
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              disabled={loading}
              sx={{ fontWeight: 700 }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage; 