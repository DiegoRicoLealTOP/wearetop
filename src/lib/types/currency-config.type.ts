// Define currency configuration type
// Using NumberFlow's Format type constraints
export type NumberFlowFormat = {
  notation?: "standard" | "compact";
  trailingZeroDisplay?: "auto" | "stripIfInteger";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

// Define currency configuration type
export type CurrencyConfig = {
  code: string; //ISO 4217 currency code
  value: number;
  symbol?: string;
  format?: NumberFlowFormat;
};
