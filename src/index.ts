export type LazyLoadFn<T> = (...args: any[]) => T;

export default function lazyload<T>(fn: LazyLoadFn<T>): LazyLoadFn<T> {
  const fnWrap: LazyLoadFn<T> = function () {
    let calculated = false;
    let val: any;

    return new Proxy(
      {},
      {
        get: function (_target, prop) {
          if (!calculated) {
            val = fn.apply(this, arguments);
            calculated = true;
          }

          return val[prop];
        },
      },
    ) as T;
  };

  return fnWrap;
}
