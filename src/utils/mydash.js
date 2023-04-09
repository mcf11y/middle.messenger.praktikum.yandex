export function identity(value) {
  return value;
}

export function last(list) {
  if (!Array.isArray(list)) {
    return;
  }

  return list[list.length - 1];
}

export function first(list) {
  if (!Array.isArray(list)) {
    return;
  }

  return list[0];
}

const baseRange = (start, end, step, isRight) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    start += step;
  }

  return result;
};

// Проверку на типы данных не добавлял, но студенты должны будут
export function range(start = 0, end, step, isRight = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, isRight);
}

export function rangeRight(start, end, step) {
  return range(start, end, step, true);
}

function isLength(value) {
  return (
    typeof value === 'number' &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function isNil(value) {
  return value === null || value === undefined;
}

function isArrayLike(value) {
  return !isNil(value) && typeof value !== 'function' && isLength(value.length);
}

function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

function getTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}

const objectProto = Object.prototype;
function isPrototype(value) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === 'function' && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

// Реализация лодаша
export function isEmpty(value) {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === 'string' ||
      typeof value.splice === 'function' ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}
