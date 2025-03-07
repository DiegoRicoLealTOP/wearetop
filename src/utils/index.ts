/**
 * Extracts the initials from a given full name.
 *
 * @param name - The full name from which to extract initials.
 * @returns A string containing the initials of the provided name.
 *
 * @example
 * // Returns "JD"
 * getInitialsFromName("John Doe");
 *
 * @example
 * // Returns "AJ"
 * getInitialsFromName("Alice Johnson");
 *
 * @example
 * // Returns "E"
 * getInitialsFromName("Eve");
 */
export function getInitialsFromName(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const colors = [
  "var(--color-cpurple-100)",
  "var(--color-cpurple-200)",
  "var(--color-cpink-100)",
  "var(--color-cteal-100)",
  "var(--color-cteal-400)",
  "var(--color-cblue)",
];

let lastColor: string | null = null; // Variable para almacenar el último color usado

export function getRandomColor() {
  let randomColor;
  do {
    const randomIndex = Math.floor(Math.random() * colors.length);
    randomColor = colors[randomIndex];
  } while (randomColor === lastColor || randomColor === "black"); // Evita repetir el último color y el negro
  lastColor = randomColor; // Actualiza el último color usado
  return randomColor;
}
