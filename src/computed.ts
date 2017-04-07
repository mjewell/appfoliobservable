import { stack } from './derivationStack';
import { Observers } from './observers';
import { addObserverCapabilities } from './addObserverCapabilities';
import { addObservableCapabilities } from './addObservableCapabilities';

export function computed(callback: () => any, name?: string) {
  const self = {
    name,
    staleCount: 0,

    incrementStaleCount() {
      if (this.staleCount === 0) {
        this.notifyStale();
      }

      this.staleCount++;
    },

    decrementStaleCount() {
      this.staleCount--;

      if (this.staleCount === 0) {
        if (this.isObserved()) {
          myVal = this.redetermineObservers(callback);
        }
        this.notifyReady();
      }
    },

    get value() {
      if (!this.isObserved()) {
        myVal = this.redetermineObservers(callback);
      }

      this.makeObservedByParent();
      return myVal;
    }
  };

  addObserverCapabilities(self);
  addObservableCapabilities(self);

  let myVal: any = (self as any).redetermineObservers(callback);

  return self;
}
