declare type Window = {
  router: any;
};
declare module "*.hbs" {
  const template: (param?: any) => string;
  export default template;
}

declare module "*.svg" {
  const image: string;
  export default image;
}

declare module "*.scss" {
  declare const styles: Record<string, string>;

  export default styles;
}

declare type UID = string | number;

declare type Nullable<T> = T | null;

declare type Maybe<T> = T | undefined;

declare type None<T> = Nullable<T> | Maybe<T>;

declare type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;

declare type OmitKeys<T extends K, K> = Omit<T, keyof K>;

declare type OmitLast<T extends any[]> = T extends [...infer P, any] ? P : any[];

declare type OmitFirst<T extends any[]> = T extends [any, ...infer P] ? P : any[];

declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

declare type Callback<T extends (...args: any[]) => any> = Maybe<T>;

declare type Handler<T extends any[] = any[]> = (...args: T) => void;

declare type PromiseValue<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

declare type TypedAction<TActionModule> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof TActionModule]: TActionModule[P] extends Function
    ? ReturnType<TActionModule[P]>
    : never;
}[keyof TActionModule];

declare type ObjectKeys<T extends object> = keyof T;

type Indexed<T = unknown> = {
  [key in string]: T;
};
