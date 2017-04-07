import { Atom } from './atom';

export class Computed extends Atom {
  constructor(callback: () => any) {
    super();
    this.callback = callback;
    this.val = this.redetermineObservers();
  }

  get value() {
    if (!this.isObserved()) {
      this.val = this.redetermineObservers();
    }

    this.makeObservedByParent();
    return this.val;
  }
}

export const computed = (callback: () => any) => new Computed(callback);
