import { stack } from './derivationStack';
import { Observers } from './observers';

export class Atom {
  val: any;
  callback = () => { };
  observers = new Observers();
  observees = new Observers();
  staleCount = 0;

  redetermineObservers() {
    const observees = this.observees.clone();
    this.observees.clear();
    stack.push(this);
    const val = this.callback();
    stack.pop();
    const unobserved = observees.difference(this.observees);
    unobserved.forEach((x: any) => x.unobserve(this));
    return val;
  }

  unobserve(observer: any) {
    this.observers.remove(observer);
  }

  notifyStale() {
    this.observers.notifyStale();
  }

  notifyReady() {
    this.observers.notifyReady();
  }

  isObserved() {
    return this.observers.length !== 0;
  }

  addObserver(observer: any) {
    this.observers.add(observer);
  }

  removeObserver(observer: any) {
    this.observers.remove(observer);
  }

  makeObservedByParent() {
    const observer = stack.peek();
    this.addObserver(observer);
    observer && observer.observees.add(this);
  }

  incrementStaleCount() {
    if (this.staleCount === 0) {
      this.notifyStale();
    }

    this.staleCount++;
  }

  decrementStaleCount() {
    this.staleCount--;

    if (this.staleCount === 0) {
      if (this.isObserved()) {
        this.val = this.redetermineObservers();
      }
      this.notifyReady();
    }
  }
}
