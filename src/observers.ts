import { difference } from 'lodash';

export class Observers {
  store: any[];

  constructor(observers?: any[]) {
    this.store = observers || [];
  }

  add(observer?: any) {
    if (observer && !this.store.includes(observer)) {
      this.store.push(observer);
    }
  }

  remove(observer?: any) {
    this.store.splice(this.store.indexOf(observer), 1);
  }

  notifyStale() {
    this.store.forEach(observer => observer.incrementStaleCount());
  }

  notifyReady() {
    this.store.forEach(observer => observer.decrementStaleCount());
  }

  clone() {
    return new Observers(this.store.slice());
  }

  clear() {
    this.store.length = 0;
  }

  difference(observers: Observers) {
    return difference(this.store, observers.store);
  }

  get length() {
    return this.store.length;
  }
}
