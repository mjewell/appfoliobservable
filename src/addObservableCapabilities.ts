import { stack } from './derivationStack';
import { Observers } from './observers';

export function addObservableCapabilities(obj: any) {
  obj.observers = new Observers();

  obj.unobserve = function (observer: any) {
    this.observers.remove(observer);
  }

  obj.notifyStale = function () {
    this.observers.notifyStale();
  }

  obj.notifyReady = function () {
    this.observers.notifyReady();
  }

  obj.isObserved = function () {
    return this.observers.length !== 0;
  }

  obj.addObserver = function (observer: any) {
    this.observers.add(observer);
  }

  obj.removeObserver = function (observer: any) {
    this.observers.remove(observer);
  }

  obj.makeObservedByParent = function () {
    const observer = stack.peek();
    this.addObserver(observer);
    observer && observer.observees.add(this);
  }
}
