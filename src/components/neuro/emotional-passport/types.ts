
export interface EmotionPoint {
  emotion: string;
  score: number;
  day: number;
  tooltip: string;
}

export interface Archetype {
  name: string;
  symbol: string;
}

// Color map for emotions
export type EmotionColorMap = {
  [key: string]: [string, string]; // [primaryColor, secondaryColor]
};
