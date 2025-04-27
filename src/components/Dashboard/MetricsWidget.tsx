import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Metric {
  title: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '120px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
}));

const MetricsWidget: React.FC = () => {
  const metrics = useSelector((state: RootState) => state.metrics.metrics);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {metrics.map((metric: Metric, index: number) => (
         <Grid key={index} size={{ xs: 3, sm: 3, md: 3 }}>
            <StyledPaper elevation={0}>
              <Typography variant="subtitle2" color="text.secondary">
                {metric.title}
              </Typography>
              <Typography variant="h5" component="div">
                {metric.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {metric.trend === 'up' ? (
                  <TrendingUpIcon color="success" fontSize="small" />
                ) : (
                  <TrendingDownIcon color="error" fontSize="small" />
                )}
                <Typography variant="caption" color={metric.trend === 'up' ? 'success.main' : 'error.main'}>
                  {metric.change}
                </Typography>
              </Box>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MetricsWidget; 