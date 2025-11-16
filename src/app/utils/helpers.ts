export function getMoneyText(value: number | null) {

    console.log("quote budget", value)
    if (!value) return value;


    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(BigInt(value));
}

export function isString(value: any): boolean {
    return typeof value === "string";
}
