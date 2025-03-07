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
