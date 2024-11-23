export function getMoneyText(value: number | string | undefined) {
  if (value === undefined) return "";
  let intValue: number;
  if (isString(value)) intValue = parseInt(value);
  else intValue = value;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(intValue);
}

export function isString(value: any): boolean {
  return typeof value === "string";
}
