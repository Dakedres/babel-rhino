"use strict";
class Hello {
  toString() {
    return 'hello';
  }
}

class Outer extends Hello {
  constructor() {
    super();
    class Inner {
      accessor [super.toString()] = 'hello';
    }

    return new Inner();
  }
}

expect(new Outer().hello).toBe('hello');
