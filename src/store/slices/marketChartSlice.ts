import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y';
type ChartType = 'candlestick' | 'line' | 'bar';

interface MarketChartState {
  timeFrame: TimeFrame;
  chartType: ChartType;
  symbol: string;
}

const initialState: MarketChartState = {
  timeFrame: '1D',
  chartType: 'candlestick',
  symbol: 'NASDAQ:AAPL',
};

const marketChartSlice = createSlice({
  name: 'marketChart',
  initialState,
  reducers: {
    setTimeFrame: (state, action: PayloadAction<TimeFrame>) => {
      state.timeFrame = action.payload;
    },
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload;
    },
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setTimeFrame, setChartType, setSymbol } = marketChartSlice.actions;
export default marketChartSlice.reducer; 