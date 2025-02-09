import { CandleStickData } from '../types/market';

export interface Pattern {
    name: string;
    confidence: number;
    description: string;
    type: 'bullish' | 'bearish' | 'neutral';
}

export class PatternDetector {
    private static readonly THRESHOLD = 0.02; // 2% threshold for pattern detection

    /**
     * Detects bullish engulfing pattern
     */
    public static detectBullishEngulfing(candles: CandleStickData[]): Pattern | null {
        if (candles.length < 2) return null;

        const current = candles[candles.length - 1];
        const previous = candles[candles.length - 2];

        if (current.close > current.open && // Current is bullish
            previous.close < previous.open && // Previous is bearish
            current.open < previous.close && // Current opens below previous close
            current.close > previous.open) { // Current closes above previous open
            
            return {
                name: 'Bullish Engulfing',
                confidence: 0.8,
                description: 'A bullish reversal pattern where a large bullish candle engulfs a previous bearish candle',
                type: 'bullish'
            };
        }

        return null;
    }

    /**
     * Detects bearish engulfing pattern
     */
    public static detectBearishEngulfing(candles: CandleStickData[]): Pattern | null {
        if (candles.length < 2) return null;

        const current = candles[candles.length - 1];
        const previous = candles[candles.length - 2];

        if (current.close < current.open && // Current is bearish
            previous.close > previous.open && // Previous is bullish
            current.open > previous.close && // Current opens above previous close
            current.close < previous.open) { // Current closes below previous open
            
            return {
                name: 'Bearish Engulfing',
                confidence: 0.8,
                description: 'A bearish reversal pattern where a large bearish candle engulfs a previous bullish candle',
                type: 'bearish'
            };
        }

        return null;
    }

    /**
     * Detects doji pattern
     */
    public static detectDoji(candles: CandleStickData[]): Pattern | null {
        if (candles.length < 1) return null;

        const current = candles[candles.length - 1];
        const bodySize = Math.abs(current.close - current.open);
        const totalSize = current.high - current.low;

        if (bodySize <= totalSize * 0.1) { // Body is very small compared to total size
            return {
                name: 'Doji',
                confidence: 0.6,
                description: 'A candlestick pattern showing market indecision where opening and closing prices are very close',
                type: 'neutral'
            };
        }

        return null;
    }

    /**
     * Analyzes a series of candles and returns all detected patterns
     */
    public static analyzePatterns(candles: CandleStickData[]): Pattern[] {
        const patterns: Pattern[] = [];

        const bullishEngulfing = this.detectBullishEngulfing(candles);
        const bearishEngulfing = this.detectBearishEngulfing(candles);
        const doji = this.detectDoji(candles);

        if (bullishEngulfing) patterns.push(bullishEngulfing);
        if (bearishEngulfing) patterns.push(bearishEngulfing);
        if (doji) patterns.push(doji);

        return patterns;
    }
}
