export const suffixK = (number) => {
  if (number < 1000) {
    return number.toString();
  }

  const rounded = Math.ceil(number / 100) / 10;
  return `${rounded}k`;
};
