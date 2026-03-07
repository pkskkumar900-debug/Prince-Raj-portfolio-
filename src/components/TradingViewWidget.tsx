import React, { useEffect, useRef, useState, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Prevent multiple script injections
    if (container.current && container.current.querySelector('script')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "allow_symbol_change": true,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "hide_volume": false,
        "hotlist": false,
        "interval": "D",
        "locale": "en",
        "save_image": false,
        "style": "1",
        "symbol": "OANDA:XAUUSD",
        "theme": "dark",
        "timezone": "exchange",
        "backgroundColor": "#0F0F0F",
        "gridColor": "rgba(242, 242, 242, 0.06)",
        "watchlist": [
          "BITSTAMP:BTCUSD",
          "OANDA:XAGUSD",
          "NSE:NIFTY",
          "TICKMILL:EURUSD",
          "NASDAQ:NVDA",
          "NASDAQ:MSFT"
        ],
        "withdateranges": true,
        "compareSymbols": [
          {
            "symbol": "TVC:DXY",
            "position": "SameScale"
          }
        ],
        "studies": [
          "STD;24h%Volume",
          "STD;RSI"
        ],
        "autosize": true
      }`;
    
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div 
      className="relative w-full h-full"
      onMouseLeave={() => setIsInteractive(false)}
    >
      {/* Overlay to prevent scroll hijacking */}
      {!isInteractive && (
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer group transition-all duration-300"
          onClick={() => setIsInteractive(true)}
        >
          <div className="px-6 py-3 bg-cyber-dark/90 border border-cyber-blue/50 rounded-full text-white font-medium shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-blue"></span>
            </span>
            Click to interact with chart
          </div>
        </div>
      )}
      
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }} data-lenis-prevent>
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/symbols/XAUUSD/?exchange=OANDA" rel="noopener nofollow" target="_blank">
            <span className="blue-text">XAUUSD chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
