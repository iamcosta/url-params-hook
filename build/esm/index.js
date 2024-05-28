import { useCallback, useEffect, useRef, useState } from "react";
export function useUrlParams() {
    const [values, setValues] = useState({});
    const prevParams = useRef(new URLSearchParams());
    function deserialize(data) {
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
        if (prevParams.current.toString() === searchParams.toString())
            return;
        window.history.pushState({}, window.document.title, `?${searchParams}`);
        prevParams.current = searchParams;
    }
    const serialize = useCallback(() => {
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
    function clear() {
        setValues({});
    }
    useEffect(() => {
        const handleUrlChange = () => {
            serialize();
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
    }, [serialize]);
    useEffect(() => {
        serialize();
    }, [serialize]);
    return {
        values,
        onChange: deserialize,
        clear,
    };
}
//# sourceMappingURL=index.js.map