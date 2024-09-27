import { useMemo } from 'react';

const useFormattedDateAndTime = (isoDate: string | undefined) => {
  return useMemo(() => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${
      String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} um ${
      String(date.getHours()).padStart(2, '0')}:${
      String(date.getMinutes()).padStart(2, '0')} Uhr`;

    return formattedDate;
  }, [isoDate]);
};

const useFormattedDate = (isoDate: string | undefined) => {
  return useMemo(() => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

    return formattedDate;
  }, [isoDate]);
};


const useFormattedTime = (isoDate: string | undefined) => {
  return useMemo(() => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} Uhr`;

    return formattedTime;
  }, [isoDate]);
};

export { useFormattedDateAndTime, useFormattedDate, useFormattedTime };
