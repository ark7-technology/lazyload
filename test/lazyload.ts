import 'should';

import lazyload from '../src';

class A {
  foo = 'bar';
  x2 = 'bar2';
  x3 = 'bar3';

  get foo2() {
    return this.x2;
  }

  foo3() {
    return this.x3;
  }
}

describe('lazyload', () => {
  it('should return the same result', () => {
    const x = 'bar2';
    let cnt = 0;

    const fn = () => {
      cnt++;
      return {
        foo: 'bar',
        foo2: () => x,
      };
    };

    const r1 = lazyload(fn)();

    cnt.should.be.eql(0);

    r1.foo.should.be.eql('bar');
    cnt.should.be.eql(1);

    r1.foo2().should.be.eql('bar2');
    cnt.should.be.eql(1);
  });

  it('should return the same result for class', () => {
    const fn = () => new A();

    const r1 = lazyload(fn)();

    r1.foo.should.be.eql('bar');
    r1.foo2.should.be.eql('bar2');
    r1.foo3().should.be.eql('bar3');
  });

  it('should return the same result for class constructor', () => {
    const fn = () => A;

    const r1 = lazyload(fn)();
    const r2 = new r1();

    r2.foo.should.be.eql('bar');
    r2.foo2.should.be.eql('bar2');
    r2.foo3().should.be.eql('bar3');
  });
});
