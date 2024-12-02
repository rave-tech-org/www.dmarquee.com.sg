export const formatCurrency = (value?: number | null) => {
  if (value != null) {
    return `S$${value}`;
  }
  return '';
};
