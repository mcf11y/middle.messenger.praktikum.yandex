interface Window {
  router: any;
}

declare type DeepPartial<T> = T extends Record<string, any>
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

declare module "*.hbs" {
  const template: (param?: any) => string;
  export default template;
}

declare module "*.svg" {
  const image: string;
  export default image;
}

declare module "*.svg" {
  const image: string;
  export default image;
}

declare type Nullable<T> = T | null;

declare type Maybe<T> = T | undefined;

declare type None<T> = Nullable<T> | Maybe<T>

declare type Optionalize<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

declare type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;

declare type OmitKeys<T extends K, K> = Omit<T, keyof K>;

type OmitLast<T extends any[]> = T extends [...infer P, any] ? P : any[];
type OmitFirst<T extends any[]> = T extends [any, ...infer P] ? P : any[];

type PromiseValue<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

declare type TypedAction<TActionModule> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof TActionModule]: TActionModule[P] extends Function
    ? ReturnType<TActionModule[P]>
    : never;
}[keyof TActionModule];

declare type HbsNode = string;
