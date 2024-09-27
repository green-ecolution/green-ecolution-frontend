import { useMemo } from 'react';

const useFormattedDate = (isoDate: string | undefined) => {
  return useMemo(() => {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    // Format date to DD.MM.YYYY HH:MM
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${
      String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${
      String(date.getHours()).padStart(2, '0')}:${
      String(date.getMinutes()).padStart(2, '0')}`;

    return formattedDate;
  }, [isoDate]);
};

export default useFormattedDate;
