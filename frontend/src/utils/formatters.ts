export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price);
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return new Date(date).toLocaleString("fa-IR", options);
};

export function timeAgo(dateString: string): string {
  const now = new Date().getTime();
  const date = new Date(dateString).getTime();

  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) {
    return "همین الان";
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} دقیقه پیش`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ساعت پیش`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} روز پیش`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ماه پیش`;
  }

  const years = Math.floor(months / 12);
  return `${years} سال پیش`;
}
