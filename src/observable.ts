import { Atom } from './atom';

export class Observable extends Atom {
  constructor(value: any) {
    super();
    this.val = value;
  }

  get value() {
    this.makeObservedByParent();
    return this.val;
  }

  set value(val) {
    if (this.val === val) {
      return;
    }
    this.notifyStale();
    this.val = val;
    this.notifyReady();
  }
}

export const observable = (val: any) => new Observable(val);
