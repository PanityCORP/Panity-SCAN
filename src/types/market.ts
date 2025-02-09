export interface CandleStickData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface MarketData {
    symbol: string;
    interval: string;
    candles: CandleStickData[];
}
