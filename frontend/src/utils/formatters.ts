export const formatPrice = (price: number) =>
    new Intl.NumberFormat("fa-IR").format(price);
export const formatDate = (
    date: string | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    return new Date(date).toLocaleString("fa-IR", options);
};