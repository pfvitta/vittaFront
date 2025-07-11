// helpers/appointmentValidations.ts

import { isWeekend, isSameMonth, isSameDay } from 'date-fns';

export const MAX_APPOINTMENTS_PER_MONTH = 2;

export function isWeekday(date: Date): boolean {
  return !isWeekend(date);
}

export function isDateInCurrentMonth(date: Date): boolean {
  const today = new Date();
  return isSameMonth(today, date);
}

export function isDuplicateDate(selectedDates: Date[], newDate: Date): boolean {
  return selectedDates.some((d) => isSameDay(d, newDate));
}

export function canAddAnotherAppointment(selectedDates: Date[]): boolean {
  return selectedDates.length < MAX_APPOINTMENTS_PER_MONTH;
}

export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
