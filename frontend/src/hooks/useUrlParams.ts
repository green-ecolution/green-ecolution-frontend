import { useCallback } from 'react';

interface FilterObject {
  name: string;
  key: string;
}

interface ParamConfig {
  [paramName: string]: FilterObject[];
}

const useUrlParams = () => {
  const updateUrlParams = useCallback((paramConfigs: ParamConfig) => {
    const params = new URLSearchParams();

    Object.entries(paramConfigs).forEach(([paramName, options]) => {
      const values = options.map(option => option.key).join(',');
      if (values) params.set(paramName, values);
    });

    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, []);

  const clearUrlParams = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
  }, []);

  return { updateUrlParams, clearUrlParams };
};

export default useUrlParams;
