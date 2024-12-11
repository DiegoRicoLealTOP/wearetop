<script lang="ts">
  import { writable } from "svelte/store";
  import { toast } from "svelte-sonner";

  interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    englishLevel: string;
    interestedIn: string;
    newsletter: boolean;
  }

  let showModal = writable(false);
  let formData = writable<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    englishLevel: "",
    interestedIn: "",
    newsletter: false,
  });

  const englishLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  function openModal() {
    $showModal = true;
  }

  function handleOutsideClick(event: MouseEvent) {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent && !modalContent.contains(event.target as Node)) {
      $showModal = false;
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formspreeEndpoint = "https://formspree.io/f/xzzborgv";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success("Thanks for your submission!");
        $showModal = false;
        form.reset();
      } else {
        toast.error("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  $: formValid =
    $formData.firstName &&
    $formData.lastName &&
    $formData.phone &&
    $formData.email &&
    $formData.englishLevel;
</script>

<div class="container mx-auto p-4 py-12 md:py-24 w-fit">
  <button
    on:click={openModal}
    class="bg-cpurple-100 text-white px-4 py-2 hover:bg-cpurple-200 transition-colors"
  >
    Apply now
  </button>

  {#if $showModal}
    <div
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      on:click={handleOutsideClick}
    >
      <div
        class="modal-content bg-white p-4 sm:p-6 w-full max-w-md mx-4"
        on:click|stopPropagation
      >
        <form on:submit={handleSubmit} class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              bind:value={$formData.firstName}
              placeholder="First Name"
              required
              class="w-full py-2 px-4 border rounded-none"
              autocomplete="given-name"
            />
            <input
              type="text"
              name="lastName"
              bind:value={$formData.lastName}
              placeholder="Last Name"
              required
              class="w-full py-2 px-2 border rounded-none"
              autocomplete="family-name"
            />
          </div>

          <input
            type="tel"
            name="phone"
            bind:value={$formData.phone}
            placeholder="Phone"
            required
            class="w-full py-2 px-4 border rounded-none"
            autocomplete="tel"
          />

          <input
            type="email"
            name="email"
            bind:value={$formData.email}
            placeholder="Email"
            required
            class="w-full py-2 px-4 border rounded-none"
            autocomplete="email"
          />

          <select
            name="englishLevel"
            bind:value={$formData.englishLevel}
            required
            class="w-full py-2 px-4 border rounded-none bg-white"
          >
            <option value="">Select English Level</option>
            {#each englishLevels as level}
              <option value={level}>{level}</option>
            {/each}
          </select>

          <textarea
            name="interestedIn"
            bind:value={$formData.interestedIn}
            placeholder="What are you interested in?"
            class="w-full py-2 px-4 border rounded-none h-24"
          ></textarea>

          <label class="flex gap-3 items-center text-sm">
            <input
              type="checkbox"
              name="newsletter"
              bind:checked={$formData.newsletter}
            />
            ¿Quieres que te enviemos información importante?
          </label>

          <span class="text-xs block"
            >Al continuar, aceptas nuestras políticas de <a
              class="hover:text-cpurple-100 transition-colors duration-150 ease-in decoration-neutral-500 decoration-dotted underline-offset-[5px] underline"
              href="https://www.wearetop.co/politica-de-proteccion-de-datos/"
              target="_blank">tratamiento de datos.</a
            ></span
          >

          <button
            type="submit"
            disabled={!formValid}
            class="w-full bg-cpurple-100 text-white py-2 px-4 hover:bg-cpurple-200
								disabled:bg-cpurple-100/20 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  {/if}
</div>
