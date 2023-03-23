export type MergeReactElementProps<
  T extends React.ElementType,
  P extends object = {}
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ObjectKeysToCamelCase<Object extends {}> = {
  [K in keyof Object as K extends string
    ? ReplaceAllByCamelCase<ReplaceAllByCamelCase<K, ":">, "/">
    : K]: Object;
};

export type RecordCamelCase<Keys extends string, Types = any> = {
  [K in Keys as K extends string
    ? ReplaceAllByCamelCase<ReplaceAllByCamelCase<K, ":">, "/">
    : K]: Types;
};

export type ReplaceAllByCamelCase<
  S extends string,
  ToReplace extends string
> = ToReplace extends ""
  ? never
  : S extends `${infer Head}${ToReplace}${infer Tail}`
  ? `${Head}${Capitalize<ReplaceAllByCamelCase<Tail, ToReplace>>}`
  : S;
