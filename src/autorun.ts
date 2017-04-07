import { Atom } from './atom';

const dummyObserver = {
  incrementStaleCount: () => { },
  decrementStaleCount: () => { }
};

export class Autorun extends Atom {
  callback: () => any;

  constructor(callback: () => any) {
    super();
    this.observers.add(dummyObserver);
    this.callback = callback;
    this.redetermineObservers();
  }
}

export const autorun = (callback: () => any) => new Autorun(callback);
