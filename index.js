import { useCallback, useEffect, useState } from "react";
export function useUrlParams() {
    const [values, setValues] = useState({});
    function onChange(data) {
        const searchParams = new URLSearchParams(window.location.search);
        for (const [k, v] of Object.entries(data)) {
            if (typeof v !== "boolean" && !v && v !== 0) {
                if (searchParams.has(k)) {
                    searchParams.delete(k);
                }
                continue;
            }
            searchParams.set(k, String(v).trim());
        }
        window.history.pushState({}, window.document.title, `?${searchParams}`);
    }
    const toValues = useCallback(() => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const obj = {};
        for (const [k, v] of params.entries()) {
            let value = v;
            if (v === "true" || v === "false") {
                value = v === "true";
            }
            else if (!v.startsWith("0") && !isNaN(+v) && !isNaN(parseFloat(v))) {
                value = Number(v);
            }
            Object.defineProperty(obj, k, { value, enumerable: true });
        }
        setValues(obj);
    }, []);
    useEffect(() => {
        toValues();
        const handleUrlChange = () => {
            toValues();
        };
        window.addEventListener("popstate", handleUrlChange);
        const pushState = window.history.pushState;
        window.history.pushState = function (...args) {
            pushState.apply(window.history, args);
            handleUrlChange();
        };
        const replaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            replaceState.apply(window.history, args);
            handleUrlChange();
        };
        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [toValues]);
    return {
        values,
        onChange,
    };
}
//# sourceMappingURL=index.js.map