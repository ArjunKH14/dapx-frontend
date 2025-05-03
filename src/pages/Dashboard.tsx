import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MarketChart from '../components/Dashboard/MarketChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
  // padding: theme.spacing(1.5),
  height: '6rem',
  // maxWidth: '60%',
  width: '15rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #1E1E2D 0%, #2D2D42 100%)',
  color: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 0.25rem 1.25rem rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    height: '5rem',
    padding: theme.spacing(1),
    maxWidth: '240px',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  opacity: 0.7,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const MetricChange = styled(Typography)<{ trend: 'up' | 'down' }>(({ theme, trend }) => ({
  fontSize: '0.7rem',
  color: trend === 'up' ? '#4CAF50' : '#F44336',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
  },
}));

const metrics = [
  {
    title: 'TOTAL P/L',
    value: '+$12,345.67',
    change: '+2.5%',
    trend: 'up' as const,
  },
  {
    title: 'WINRATE',
    value: '78.5%',
    change: '+5.2%',
    trend: 'up' as const,
  },
  {
    title: 'AVG PROFIT',
    value: '$1,234.56',
    change: '+3.1%',
    trend: 'up' as const,
  },
  {
    title: 'AVG LOSS',
    value: '$567.89',
    change: '-1.8%',
    trend: 'down' as const,
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 8 }} sx={{ mb: { xs: 2, sm: 3 }, ml: { xs: 4, sm: 4, md: 2 } }} >
        {metrics.map((metric, index) => (
          // <Grid item xs={6} sm={6} md={3} key={metric.title}>
             <Grid  key={metric.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StyledPaper>
                <MetricTitle variant="subtitle2" gutterBottom>
                  {metric.title}
                </MetricTitle>
                <MetricValue variant="h5" gutterBottom>
                  {metric.value}
                </MetricValue>
                <MetricChange variant="caption" trend={metric.trend}>
                  {metric.change}
                </MetricChange>
              </StyledPaper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <MarketChart />
    </Box>
  );
};

export default Dashboard; 