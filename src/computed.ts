import { peek, pop, push } from './stack';

export function computed(callback: () => any, name: string) {
  const observers: any[] = [];

  function compute() {
    push(self);
    const val = callback();
    pop();
    return val;
  }

  const self = {
    name,
    staleCount: 0,

    notifyStale() {
      if (this.staleCount === 0) {
        observers.forEach(observer => observer.notifyStale());
      }

      this.staleCount++;
    },

    notifyReady() {
      this.staleCount--;

      if (this.staleCount === 0) {
        if (observers.length !== 0) {
          myVal = compute();
        }
        observers.forEach(observer => observer.notifyReady());
      }
    },

    get value() {
      if (observers.length === 0) {
        myVal = compute();
      }

      const observer = peek();
      if (observer && !observers.includes(observer)) {
        observers.push(observer);
      }
      return myVal;
    }
  };

  let myVal = compute();

  return self;
}
