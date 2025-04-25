const NUMBER_FORMATTER = new Intl.NumberFormat();

export const renderNumber = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return null;

  if (typeof value === 'string') {
    value = Number(value);
  }

  if (isNaN(value)) return null;

  return NUMBER_FORMATTER.format(value);
};
