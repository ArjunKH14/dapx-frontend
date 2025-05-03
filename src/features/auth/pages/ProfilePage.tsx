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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            // src={user.avatar}
            sx={{ width: 100, height: 100, mb: 2, fontSize: '3rem', bgcolor: '#2D2D42' }}
          >

              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            <strong>{user.name}</strong>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom>
            <strong>Personal Information</strong>
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date of Birth:</strong> {formatDate(user.dob)}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom>
              <strong>Account Information</strong>  
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>User ID:</strong> {user.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Member Since:</strong> {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage; 