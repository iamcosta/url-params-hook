export interface ParamValues {
    [k: string]: unknown;
}
export declare function useUrlParams<T extends ParamValues>(): {
    params: T;
    onChange: (data: T) => void;
};
//# sourceMappingURL=index.d.ts.map