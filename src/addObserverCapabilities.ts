import { stack } from './derivationStack';
import { Observers } from './observers';

export function addObserverCapabilities(obj: any) {
  obj.observees = new Observers();

  obj.redetermineObservers = function (callback: () => any) {
    const observees = this.observees.clone();
    this.observees.clear();
    stack.push(this);
    const val = callback();
    stack.pop();
    const unobserved = observees.difference(this.observees);
    unobserved.forEach((x: any) => x.unobserve());
    return val;
  }
}
