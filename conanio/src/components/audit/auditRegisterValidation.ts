/** Field validators from conan-catalog-proxy `register.tsx` / `recover.tsx` (true = invalid). */

export function validateNameField(value: string) {
  if (value === "") {
    return false;
  }
  const validRegex = /^[\p{L}\p{N} \.'\-]+$/u;
  return !validRegex.test(value);
}

export function validateEmailField(value: string) {
  if (value === "") {
    return false;
  }
  const validRegex = /^[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}$/u;
  return !validRegex.test(value);
}

export function validateCountryField(
  value: string,
  countryNames: readonly string[],
) {
  if (value === "") {
    return false;
  }
  return !countryNames.includes(value);
}
