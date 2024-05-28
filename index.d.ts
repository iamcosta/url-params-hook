export type ParamsProps = {
    [k: string]: unknown;
};
export declare function useUrlParams<T extends ParamsProps>(): {
    values: T;
    onChange: (data: T) => void;
    clear: () => void;
};
//# sourceMappingURL=index.d.ts.map