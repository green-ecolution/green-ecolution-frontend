import { useCallback } from 'react';

interface FilterObject {
  name: string;
  key: string;
}

const useUrlParams = () => {
  const updateUrlParams = useCallback((key: string, options: FilterObject[]) => {
    const urlParams = new URLSearchParams(window.location.search);

    if (options.length > 0) {
      const values = options.map(option => option.key).join(',');
      urlParams.set(key, values);
    } else {
      urlParams.delete(key);
    }
    
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
  }, []);

  const clearUrlParams = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
  }, []);

  const getUrlParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string[]> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value.split(',');
    }

    return result;
  }, []);

  return { updateUrlParams, clearUrlParams, getUrlParams };
};

export default useUrlParams;
