import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1E1E2D',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: '12px',
  height: '100%',
}));

const InsightTitle = styled(Typography)({
  color: '#00C853',
  fontSize: '14px',
  marginBottom: '8px',
});

const InsightDate = styled(Typography)({
  color: '#6B7280',
  fontSize: '12px',
  marginBottom: '16px',
});

const InsightText = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  lineHeight: 1.6,
  marginBottom: '24px',
});

const StatBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
});

const StatLabel = styled(Typography)({
  color: '#6B7280',
  fontSize: '14px',
});

const StatValue = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  fontWeight: 500,
});

interface SetupInsightsProps {
  data: {
    title: string;
    date: string;
    description: string;
    stats: {
      avgReturn: string;
      winRate: string;
      trades: number;
    };
  };
}

const SetupInsights: React.FC<SetupInsightsProps> = ({ data }) => {
  return (
    <StyledPaper>
      <Box>
        <InsightTitle variant="h6">
          {data.title}
        </InsightTitle>
        <InsightDate>
          {data.date}
        </InsightDate>
        <InsightText>
          {data.description}
        </InsightText>

        <Box sx={{ mt: 4 }}>
          <StatBox>
            <StatLabel>Avg Return</StatLabel>
            <StatValue>{data.stats.avgReturn}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Win Rate</StatLabel>
            <StatValue>{data.stats.winRate}</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>Trades</StatLabel>
            <StatValue>{data.stats.trades}</StatValue>
          </StatBox>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default SetupInsights; 