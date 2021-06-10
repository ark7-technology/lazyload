export type LazyLoadFn<T> = (...args: any[]) => T;

export default function lazyload<T>(fn: LazyLoadFn<T>): LazyLoadFn<T> {
  const fnWrap: LazyLoadFn<T> = function () {
    let calculated = false;
    let val: any;

    function getVal() {
      if (!calculated) {
        val = fn.apply(this, arguments);
        calculated = true;
      }
      return val;
    }

    const handler = {
      apply(_target: any, thisArg: any, argArray: any[]) {
        const fn = getVal();
        return fn.apply(thisArg, argArray);
      },

      construct(_target: any, argArray: any[]) {
        const cls = getVal();
        return new cls(...argArray);
      },

      defineProperty(
        _target: any,
        p: string | symbol,
        attributes: PropertyDescriptor,
      ) {
        return Object.defineProperty(getVal(), p, attributes);
      },

      deleteProperty(_target: any, p: string | symbol) {
        return Reflect.deleteProperty(getVal(), p);
      },

      get(_target: any, prop: string | symbol) {
        return getVal()[prop];
      },

      getOwnPropertyDescriptor(
        _target: any,
        p: string | symbol,
      ): PropertyDescriptor | undefined {
        return Object.getOwnPropertyDescriptor(getVal(), p);
      },

      getPrototypeOf(_target: any) {
        return Object.getPrototypeOf(getVal());
      },

      has(_target: any, p: string | symbol) {
        return Reflect.has(getVal(), p);
      },

      isExtensible(_target: any) {
        return Reflect.isExtensible(getVal());
      },

      ownKeys(_target: any) {
        return Reflect.ownKeys(getVal());
      },

      preventExtensions(_target: any) {
        return Reflect.preventExtensions(getVal());
      },

      set(_target: any, p: string | symbol, value: any) {
        getVal()[p] = value;
        return true;
      },

      setPrototypeOf(_target: any, v: object | null) {
        return Reflect.setPrototypeOf(getVal(), v);
      },
    };

    return new Proxy(function () {}, handler) as T;
  };

  return fnWrap;
}
