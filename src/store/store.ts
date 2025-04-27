import { configureStore } from '@reduxjs/toolkit';
import marketChartReducer from './slices/marketChartSlice';
import metricsReducer from './slices/metricsSlice';

export const store = configureStore({
  reducer: {
    marketChart: marketChartReducer,
    metrics: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 