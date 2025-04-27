import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTimeFrame, setChartType } from '../store/slices/marketChartSlice';

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y';
type ChartType = 'candlestick' | 'line' | 'bar';

export const useMarketChart = () => {
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { timeFrame, chartType, symbol } = useSelector((state: RootState) => state.marketChart);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined" && currentContainer) {
        new window.TradingView.widget({
          autosize: true,
          symbol,
          interval: timeFrame === '1D' ? 'D' : timeFrame === '1W' ? 'W' : 'M',
          timezone: "Etc/UTC",
          theme: "light",
          style: chartType === 'candlestick' ? "1" : chartType === 'line' ? "0" : "8",
          locale: "en",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: currentContainer.id,
        });
      }
    };
    currentContainer.appendChild(script);

    return () => {
      if (currentContainer && script.parentNode) {
        currentContainer.removeChild(script);
      }
    };
  }, [timeFrame, chartType, symbol]);

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    dispatch(setTimeFrame(newTimeFrame));
  };

  const handleChartTypeChange = (newChartType: ChartType) => {
    dispatch(setChartType(newChartType));
  };

  return {
    container,
    timeFrame,
    chartType,
    handleTimeFrameChange,
    handleChartTypeChange,
  };
}; 