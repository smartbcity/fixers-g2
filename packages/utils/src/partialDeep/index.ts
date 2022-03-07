//TODO See this impl https://github.com/sindresorhus/type-fest/blob/HEAD/source/partial-deep.d.ts
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};
