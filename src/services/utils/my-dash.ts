/* eslint-disable no-useless-return */
/* eslint-disable no-return-assign */
import { isBuffer, isTypedArray } from "lodash";

export function identity<T>(arg: T): T {
  return arg;
}

export function last<T>(list: T[]): T | never {
  if (!Array.isArray(list)) {
    throw Error("This is not a Array");
  }

  return list[list.length - 1];
}

export function first<T>(list: T[]): T | never {
  if (!Array.isArray(list)) {
    throw Error("This is not a Array");
  }

  return list[0];
}

const baseRange = (start: number, end: number, step: number, isRight: boolean) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array<number>(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    // eslint-disable-next-line no-param-reassign
    start += step;
  }

  return result;
};

export function range(start = 0, end: number, step: number, isRight = false) {
  if (end === undefined) {
    // eslint-disable-next-line no-param-reassign
    end = start;
    // eslint-disable-next-line no-param-reassign
    start = 0;
  }

  // eslint-disable-next-line no-param-reassign, no-nested-ternary
  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, isRight);
}

export function rangeRight(start: number, end: number, step: number) {
  return range(start, end, step, true);
}

function isLength<T>(value: T) {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

export function isNil(value: any): value is undefined | null {
  return value === null || value === undefined;
}

export function isArrayLike<T>(value: T) {
  if (typeof value === "object") {
    return (
      !isNil(value) &&
      typeof value !== "function" &&
      "length" in value &&
      isLength(value.length)
    );
  }

  return false;
}

export function isObjectLike<T>(value: T) {
  return typeof value === "object" && value !== null;
}

export function getTag<T>(value: T) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }

  return toString.call(value);
}

export const objectProto = Object.prototype;

export function isPrototype(value: Record<string, any>) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

export function isArguments(value: any) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

export function isEmpty(value: any) {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  if (isPrototype(value)) {
    return Object.keys(value).length === 0;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

type NestedArray<T = any> = T | Array<NestedArray<T>>;

// Too infinity deep
export type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<
        InnerArr,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ][Depth]
      >
    : Arr;
}[Depth extends -1 ? "done" : "recur"];

export function flatten<T>(array: Array<NestedArray<T>>): T[] {
  const stack = [...array];
  const result: T[] = [];

  while (stack.length > 0) {
    const value = stack.pop() as T[];

    if (Array.isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  }

  return result;
}

export function trim(str: string, trimmedChars?: string): string {
  if (!trimmedChars) {
    return str.trim();
  }
  const regex = new RegExp(`^[${trimmedChars}]+|[${trimmedChars}]+$`, "g");
  return str.replace(regex, "");
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p]?.constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function setObjValue(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}

type PlainObject<T = any> = {
  [k in string]: T;
};

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isFunction(value: unknown): value is Function {
  return value !== null && {}.toString.call(value) === "[object Function]";
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs)?.length !== Object.keys(rhs)?.length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (Number.isNaN(value) && Number.isNaN(rightValue)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      isFunction(value) &&
      isFunction(rightValue) &&
      value.toString() !== rightValue.toString()
    ) {
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(
    item: T
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: any[] = [];

      // eslint-disable-next-line no-return-assign
      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: object = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach(
        // @ts-ignore:next-line
        (s) => (copy[s] = _cloneDeep(item[s]))
      );

      // Handle:
      // * Object.name (other)

      // @ts-ignore:next-line eslint-disable-next-line no-return-assign
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error("input must be an object");
  }

  const queryArr: string[] = [];
  function stringify(key: string, value: any) {
    if (typeof value !== "object") {
      queryArr.push(`${key}=${encodeURIComponent(String(value))}`);
      return;
    }

    if (isArray(value)) {
      value.forEach((v, i) => stringify(`${key}[${i}]`, v));
      return;
    }

    if (isPlainObject(value)) {
      for (const [k, v] of Object.entries(value)) {
        stringify(`${key}[${k}]`, v);
      }
      return;
    }
  }

  for (const [key, value] of Object.entries(data)) {
    stringify(key, value);
  }

  return queryArr.join("&");
}
