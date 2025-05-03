import { configureStore } from '@reduxjs/toolkit';
import marketChartReducer from './slices/marketChartSlice';
import metricsReducer from './slices/metricsSlice';
import authReducer from '../features/auth/store/authSlice';

export const store = configureStore({
  reducer: {
    marketChart: marketChartReducer,
    metrics: metricsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 