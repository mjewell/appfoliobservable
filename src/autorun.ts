import { pop, push } from './stack';

export function autorun(callback: () => any, name: string) {
  function run() {
    push(self);
    callback();
    pop();
  }

  const self = {
    name,
    staleCount: 0,

    notifyStale() {
      this.staleCount++;
    },

    notifyReady() {
      this.staleCount--;

      if (this.staleCount === 0) {
        run();
      }
    }
  };

  run();
}
