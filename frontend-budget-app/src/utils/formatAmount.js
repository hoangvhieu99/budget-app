export const formatAmount = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "vnd",
  }).format(amount);
};
