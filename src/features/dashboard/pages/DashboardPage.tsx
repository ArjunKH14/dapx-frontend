import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const dashboardCards = [
    {
      title: 'Profile',
      description: 'View and edit your personal information',
      action: () => navigate('/profile'),
      actionText: 'View Profile',
    },
    {
      title: 'Journal',
      description: 'Write and review your trading journal entries',
      action: () => navigate('/journal'),
      actionText: 'Go to Journal',
    },
    {
      title: 'Settings',
      description: 'Manage your account settings and preferences',
      action: () => navigate('/settings'),
      actionText: 'Go to Settings',
    },
    {
      title: 'Analytics',
      description: 'View your usage statistics and insights',
      action: () => navigate('/analytics'),
      actionText: 'View Analytics',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/profile')}
          >
            View Profile
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom color="text.secondary">
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your account and available features.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {card.title}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button
                  size="medium"
                  variant="contained"
                  onClick={card.action}
                  fullWidth
                >
                  {card.actionText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage; 