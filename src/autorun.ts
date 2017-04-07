import { pop, push } from './stack';

export function autorun(callback: () => any) {
  const self = {
    staleCount: 0,

    notifyStale() {
      this.staleCount++;
    },

    notifyReady() {
      this.staleCount--;

      if (this.staleCount === 0) {
        push(self);
        callback();
        pop();
      }
    }
  };

  push(self);
  callback();
  pop();
}
