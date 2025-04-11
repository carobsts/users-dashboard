export const formatNumberShort = (num: number): string => {
  const format = (value: number, suffix: string) =>
    value % 1 === 0
      ? `${value.toFixed(0)}${suffix}`
      : `${value.toFixed(1)}${suffix}`;

  if (num >= 1_000_000) return format(num / 1_000_000, "M");
  if (num >= 1_000) return format(num / 1_000, "k");
  return num.toString();
};
