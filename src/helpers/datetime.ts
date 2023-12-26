import format from 'date-fns/format';
import addDaysFns from 'date-fns/addDays';

export const formateDate = (date: string | Date) =>
  format(new Date(date), 'MMM. dd, yyyy') ?? '';

export const addDays = (date: string, period: number) => {
  const now = new Date(date);
  return addDaysFns(now, period);
};
