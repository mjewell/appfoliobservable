import { peek, pop, push } from './stack';

export function computed(callback: () => any) {
  const observers: any[] = [];
  let myVal = callback();

  const self = {
    staleCount: 0,

    notifyStale() {
      this.staleCount++;
      observers.forEach(observer => observer.notifyStale());
    },

    notifyReady() {
      this.staleCount--;

      if (this.staleCount === 0) {
        const val = callback();
        if (myVal === val) {
          return;
        }
        myVal = val;
        observers.forEach(observer => observer.notifyReady());
      }
    },

    get value() {
      observers.length = 0;
      const observer = peek();
      if (observer && !observers.includes(observer)) {
        observers.push(observer);
      }
      push(self);
      const val = callback();
      pop();
      return val;
    }
  };

  return self;
}
