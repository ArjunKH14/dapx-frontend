import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface MetricsState {
  metrics: Metric[];
}

const initialState: MetricsState = {
  metrics: [
    {
      title: 'TOTAL P/L',
      value: '+$12,345.67',
      change: '+2.5%',
      trend: 'up',
    },
    {
      title: 'WINRATE',
      value: '78.5%',
      change: '+5.2%',
      trend: 'up',
    },
    {
      title: 'AVG PROFIT',
      value: '$1,234.56',
      change: '+3.1%',
      trend: 'up',
    },
    {
      title: 'AVG LOSS',
      value: '$567.89',
      change: '-1.8%',
      trend: 'down',
    },
  ],
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    updateMetrics: (state, action: PayloadAction<Metric[]>) => {
      state.metrics = action.payload;
    },
  },
});

export const { updateMetrics } = metricsSlice.actions;
export default metricsSlice.reducer; 