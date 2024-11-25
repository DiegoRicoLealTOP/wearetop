type CurrencyCode = "usd" | "aud";

interface CurrencyFormatter {
  style: "currency";
  currency: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
}

interface CurrencyFormatters {
  [key: string]: CurrencyFormatter;
}

export const formatPrice = (
  price: number,
  currency: CurrencyCode,
  decimals: number = 0,
): string => {
  const formatters: CurrencyFormatters = {
    usd: {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    },
    aud: {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    },
  };

  return new Intl.NumberFormat(
    currency === "aud" ? "en-AU" : "en-US",
    formatters[currency.toLowerCase() as CurrencyCode],
  ).format(price);
};
