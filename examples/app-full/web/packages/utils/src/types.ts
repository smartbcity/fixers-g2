export type MergeReactElementProps<
  T extends React.ElementType,
  P extends object = {}
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
