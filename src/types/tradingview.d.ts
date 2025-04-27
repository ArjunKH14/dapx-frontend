declare global {
  interface Window {
    TradingView: {
      widget: new (options: {
        autosize: boolean;
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        enable_publishing: boolean;
        hide_top_toolbar: boolean;
        hide_legend: boolean;
        save_image: boolean;
        container_id: string;
      }) => void;
    };
  }
}

export {}; 