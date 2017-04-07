import { stack } from './derivationStack';
import { Observers } from './observers';
import { addObservableCapabilities } from './addObservableCapabilities';

export function observable(value: any) {
  let myVal = value;

  const self = {
    get value() {
      this.makeObservedByParent();
      return myVal;
    },

    set value(val) {
      if (myVal === val) {
        return;
      }
      this.notifyStale();
      myVal = val;
      this.notifyReady();
    }
  };

  addObservableCapabilities(self);

  return self;
}
