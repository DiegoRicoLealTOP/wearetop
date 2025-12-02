<script lang="ts">
  import type { CurrencyConfig } from "@/lib/types/currency-config.type";
  import NumberFlow from "@number-flow/svelte";
  import { onMount } from "svelte";

  let {
    currencies,
    intervalSeconds = 8,
    autoRotate = true,
  } = $props<{
    currencies: CurrencyConfig[];
    intervalSeconds?: number;
    autoRotate?: boolean;
  }>();

  // State
  let currentIndex = $state(0);
  let intervalId: ReturnType<typeof setInterval> | undefined;

  // Computed values (derived state)
  let currentCurrency = $derived(currencies[currentIndex]);
  let currencySymbol = $derived(currentCurrency.symbol || "$");
  let formatOptions = $derived({
    trailingZeroDisplay: "stripIfInteger" as const,
    ...currentCurrency.format,
  });

  // Toggle to next currency
  const toggleCurrency = () => {
    currentIndex = (currentIndex + 1) % currencies.length;
  };

  // Start interval
  const startInterval = () => {
    if (intervalId) clearInterval(intervalId);
    if (autoRotate && intervalSeconds > 0) {
      intervalId = setInterval(toggleCurrency, intervalSeconds * 1000);
    }
  };

  // Initialize on mount and cleanup
  onMount(() => {
    startInterval();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  // Restart interval when props change
  $effect(() => {
    if (autoRotate !== undefined && intervalSeconds !== undefined) {
      startInterval();
    }
  });
</script>

<button
  class="space cursor-pointer rounded-2xl bg-black/10 px-4 py-2 text-center text-3xl font-black text-white drop-shadow-md backdrop-blur-sm"
  onclick={toggleCurrency}
>
  <NumberFlow
    value={currentCurrency.value}
    format={formatOptions}
    prefix={`${currentCurrency.code.toUpperCase()} ${currencySymbol}`}
  />
</button>
