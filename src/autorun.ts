import { stack } from './derivationStack';
import { Observers } from './observers';
import { addObserverCapabilities } from './addObserverCapabilities';

export function autorun(callback: () => any, name?: string) {
  const self = {
    name,
    staleCount: 0,

    incrementStaleCount() {
      this.staleCount++;
    },

    decrementStaleCount() {
      this.staleCount--;

      if (this.staleCount === 0) {
        this.redetermineObservers(callback);
      }
    }
  };

  addObserverCapabilities(self);

  (self as any).redetermineObservers(callback);
}
