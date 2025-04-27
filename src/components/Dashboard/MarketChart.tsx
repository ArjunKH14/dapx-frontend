import React from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useMarketChart } from '../../hooks/useMarketChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  height: '450px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    height: '500px',
  },
  [theme.breakpoints.down('md')]: {
    height: '400px',
  },
}));

const ChartHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

const ChartTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#1E1E2D',
});

const TimeFrameGroup = styled(ToggleButtonGroup)({
  '& .MuiToggleButton-root': {
    padding: '4px 12px',
    fontSize: '14px',
    textTransform: 'none',
    border: '1px solid #E0E0E0',
    '&.Mui-selected': {
      backgroundColor: '#233CB8',
      color: 'white',
      '&:hover': {
        backgroundColor: '#1E2D6B',
      },
    },
  },
});

const ChartContainer = styled(Box)({
  flex: 1,
  backgroundColor: '#F8F9FA',
  borderRadius: '8px',
  padding: '16px',
  position: 'relative',
});

const MarketChart = () => {
  const {
    container,
    timeFrame,
    chartType,
    handleTimeFrameChange,
    handleChartTypeChange,
  } = useMarketChart();

  return (
    <StyledPaper>
      <ChartHeader>
        <ChartTitle>Market Overview</ChartTitle>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(_, value) => value && handleChartTypeChange(value)}
            size="small"
          >
            <ToggleButton value="candlestick">
              <CandlestickChartIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="line">
              <ShowChartIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="bar">
              <BarChartIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
          <TimeFrameGroup
            value={timeFrame}
            exclusive
            onChange={(_, value) => value && handleTimeFrameChange(value)}
            size="small"
          >
            <ToggleButton value="1D">1D</ToggleButton>
            <ToggleButton value="1W">1W</ToggleButton>
            <ToggleButton value="1M">1M</ToggleButton>
            <ToggleButton value="3M">3M</ToggleButton>
            <ToggleButton value="1Y">1Y</ToggleButton>
          </TimeFrameGroup>
        </Box>
      </ChartHeader>
      <ChartContainer>
        <div 
          id="tradingview_widget" 
          ref={container} 
          style={{ height: '100%', width: '100%' }}
        />
      </ChartContainer>
    </StyledPaper>
  );
};

export default MarketChart; 