import { useEffect } from 'react';

type Params = {
    [key: string]: string | undefined;
};

function setParamsInUrl(params: Params, setPage = true) {
    const searchURL = new URL(window.location.href);

    if (!params) {
        clearUrlParams();
        return;
    }

    if (setPage) {
        searchURL.searchParams.set('page', '1');
    }

    for (const [key, value] of Object.entries(params)) {
        value ? searchURL.searchParams.set(key, value) : searchURL.searchParams.delete(key);
    }

    window.history.replaceState({}, '', searchURL.toString());
}

function clearUrlParams() {
    const currentUrl = new URL(window.location.href);
    currentUrl.search = '';
    window.history.replaceState({}, '', currentUrl.toString());
}

export function useUrlParams(params: Params, setPage = true) {
    useEffect(() => {
      setParamsInUrl(params, setPage);
    }, [params, setPage]);
}
