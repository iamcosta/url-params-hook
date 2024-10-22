export type ParamsProps = {
    [k: string]: unknown;
};
type UrlParamsProps<T> = {
    ignoreKeys: (keyof T)[];
};
export declare function useUrlParams<T extends ParamsProps>(props?: Partial<UrlParamsProps<T>>): {
    values: T;
    onChange: (data: T) => void;
    clear: () => void;
};
export {};
//# sourceMappingURL=index.d.ts.map