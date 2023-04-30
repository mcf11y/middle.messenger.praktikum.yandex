import { isBuffer, isTypedArray } from 'lodash';

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

const baseRange = (
  start: number,
  end: number,
  step: number,
  isRight: boolean
) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array<number>(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    start += step;
  }

  return result;
};

export function range(start = 0, end: number, step: number, isRight = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

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

export function isNil(value: unknown): value is null | undefined {
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

export function isPrototype(value: object) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

export function isArguments(value: any) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

export function isEmpty (value: any) {
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
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}


type NestedArray<T = unknown> = T | NestedArray<T>[];

// too infinity deep
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

export function flatten<T>(array: NestedArray<T>[]): T[] {
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
