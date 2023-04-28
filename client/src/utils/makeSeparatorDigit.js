export const makeSeparatorDigit = (data) => {
  return data.replace(/[^\d]/g, "").replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
};
