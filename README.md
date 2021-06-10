# @ark7/lazyload

> `@ark7/lazyload` delays loading of object creation. Object will not be loaded before accessing its properties.

```typescript
import lazyload from '@ark7/lazyload';

let called = 0;

function fn() {
  called++;
  return { foo: 'bar' };
}

const obj = lazyload(fn)();

called.should.be.equal(0);

obj.foo.should.be.equal('bar');

called.should.be.equal(1);
```
