import { useSearchParams } from "react-router-dom";

export interface ParamValues {
  [k: string]: unknown;
}
export function useUrlParams<T extends ParamValues>() {
  const [params, setParams] = useSearchParams();

  function onChange(data: T) {
    setParams((prev) => {
      for (const [k, v] of Object.entries(data)) {
        if (typeof v !== 'boolean' && !v && v !== 0) {
          if (prev.has(k)) {
            prev.delete(k);
          }
          continue;
        }
        prev.set(k, String(v).trim());
      }
      return prev;
    });
  }

  function toObj() {
    const obj: T = {} as T;
    for (const [k, v] of params.entries()) {
      let value: unknown = v;
      if (v === 'true' || v === 'false') {
        value = v === 'true';
      } else if (!v.startsWith('0') && !isNaN(+v) && !isNaN(parseFloat(v))) {
        value = Number(v);
      }
      Object.defineProperty(obj, k, { value, enumerable: true });
    }
    return obj;
  }

  return {
    params: toObj(),
    onChange,
  };
}
