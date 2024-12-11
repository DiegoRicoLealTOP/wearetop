<script lang="ts">
  import NumberFlow from "@number-flow/svelte";
  import { onDestroy } from "svelte";

  export let usd: number;
  export let aud: number;

  let currentCurrency: "usd" | "aud" = "usd";
  let value = usd;

  // Variable para manejar el intervalo
  let intervalId: number;

  // Función para cambiar la moneda
  const toggleCurrency = () => {
    currentCurrency = currentCurrency === "usd" ? "aud" : "usd";
    value = currentCurrency === "usd" ? usd : aud;
  };

  const SECONDS = 8 * 1000; // sec * mils

  // Iniciar el intervalo cuando el componente se monta
  intervalId = setInterval(toggleCurrency, SECONDS);

  // Limpiar el intervalo cuando el componente se destruye
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<button
  class="space rounded-2xl bg-black/10 px-4 py-2 text-center text-3xl font-black text-white drop-shadow-md backdrop-blur-sm cursor-pointer"
  onclick={toggleCurrency}
>
  <NumberFlow
    {value}
    format={{
      trailingZeroDisplay: "stripIfInteger",
    }}
    prefix={`${currentCurrency.toUpperCase()} $`}
  />
</button>
