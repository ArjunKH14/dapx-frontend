import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1E1E2D',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: '12px',
  height: '100%',
}));

interface SetupStatsProps {
  data: {
    name: string;
    return: number;
  }[];
}

const SetupStats: React.FC<SetupStatsProps> = ({ data }) => {
  return (
    <StyledPaper>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            vertical={false}
            stroke="rgba(255,255,255,0.1)" 
          />
          <XAxis
            dataKey="name"
            stroke="#fff"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            stroke="#fff"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => value}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            ticks={[-225, -200, -175, -150, -125, -100, -75, -50, -25, 0]}
          />
          <Bar
            dataKey="return"
            fill="#FF4B6E"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledPaper>
  );
};

export default SetupStats; 