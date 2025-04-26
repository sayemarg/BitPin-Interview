const NUMBER_FORMATTER = new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 });

const TIME_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });

export const renderNumber = (value?: string | number) => {
  if (value === undefined || value === null || value === '') return null;

  if (typeof value === 'string') {
    value = Number(value);
  }

  if (isNaN(value)) return null;

  return NUMBER_FORMATTER.format(value);
};

export const renderTime = (value?: Date | number) => TIME_FORMATTER.format(value);
