
import { useCallback } from 'react';

interface FilterObject {
  name: string;
  key: string;
}

const useUrlParams = () => {
  const updateUrlParams = useCallback((params: Record<string, FilterObject[]>) => {
    const urlParams = new URLSearchParams();
    
    for (const [key, options] of Object.entries(params)) {
      const values = options.map(option => option.key).join(',');
      if (values) {
        urlParams.set(key, values);
      }
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
