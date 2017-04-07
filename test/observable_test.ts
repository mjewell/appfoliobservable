import { autorun, computed, observable } from '../src';
import * as assert from 'assert';
import 'mocha';

describe('observable', () => {
  it('should wrap a primitive', () => {
    const x = observable(1);
    const y = observable('hello');
    const z = observable(3);
    const a = computed(() => x.value + z.value, 'c');

    autorun(() => {
      console.log(x.value);
      console.log(z.value);
      console.log(a.value);
      console.log('*******');
    }, 'a');

    x.value = 2;
    x.value = 2;
    y.value = 'world';
    z.value = 5;
  });

  it.only('works really really well', () => {
    const obs1 = observable(1);
    const obs2 = observable(2);
    const obs3 = observable(3);

    const computed11 = computed(() => obs1.value + obs2.value, 'c11');
    const computed12 = computed(() => obs2.value, 'c12');

    const computed21 = computed(() => obs2.value + computed12.value, 'c21');
    const computed22 = computed(() => computed12.value + obs3.value, 'c22');
    const computed23 = computed(() => obs3.value, 'c23');

    const computed31 = computed(() => computed21.value + computed22.value, 'c31');

    autorun(() => {
      console.log('autorun 1');
      console.log(obs1.value);
      console.log(computed21.value);
    }, 'a1');

    autorun(() => {
      console.log('autorun 2');
      console.log(computed22.value);
      console.log(computed23.value);
    }, 'a2');

    console.log('set to 100');

    obs2.value = 100;
  });
});
