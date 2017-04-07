import { peek } from './stack';

export function observable(value: any) {
  const observers: any[] = [];
  let myVal = value;

  return {
    get value() {
      const observer = peek();
      if (observer && !observers.includes(observer)) {
        observers.push(observer);
      }
      return myVal;
    },

    set value(val) {
      if (myVal === val) {
        return;
      }
      observers.forEach(observer => observer.notifyStale());
      myVal = val;
      observers.forEach(observer => observer.notifyReady());
    }
  };
}
