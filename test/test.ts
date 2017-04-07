import { autorun, computed, observable } from '../src';
import * as assert from 'assert';
import 'mocha';

describe('observable', () => {
  it('should return the value when you get .value', () => {
    const obs = observable(1);
    assert.equal(obs.value, 1);
  });

  it('should calculate a computed immediately', () => {
    const obs = observable(1);
    const comp = computed(() => obs.value + 1);
    assert.equal(comp.value, 2);
  });

  it('should update a computed when the observable changes', () => {
    const obs = observable(1);
    const comp = computed(() => obs.value + 1);
    assert.equal(comp.value, 2);

    obs.value = 10;
    assert.equal(comp.value, 11);
  });

  it('should update a computed when any related observables change', () => {
    const obs1 = observable(1);
    const obs2 = observable(2);

    const comp = computed(() => obs1.value + obs2.value);
    assert.equal(comp.value, 3);

    obs1.value = 10;
    assert.equal(comp.value, 12);

    obs2.value = 100;
    assert.equal(comp.value, 110);
  });

  it('should not update a computed when any unrelated observables change', () => {
    const obs1 = observable(1);
    const obs2 = observable(2);
    const comp = computed(() => obs1.value + 1);
    assert.equal(comp.value, 2);

    obs2.value = 10;
    assert.equal(comp.value, 2);
  });

  it('should redetermine its dependent observables on each run', () => {
    const obs1 = observable(true);
    const obs2 = observable('hello');

    let i = 0;
    const comp = computed(() => {
      if (obs1.value) {
        return obs2.value;
      }

      i++;
      return 'whatever';
    }, 'c');

    autorun(() => {
      comp.value;
    }, 'a');

    assert.equal(i, 0);
    assert.equal(comp.value, 'hello');

    obs2.value = 'world';
    assert.equal(i, 0);
    assert.equal(comp.value, 'world');

    obs1.value = false;
    assert.equal(comp.value, 'whatever');
    assert.equal(i, 1);

    obs2.value = '!';
    assert.equal(comp.value, 'whatever');
    assert.equal(i, 1);

    obs1.value = true;
    assert.equal(comp.value, '!');
    assert.equal(i, 1);
  });

  it('should recalculate computeds if they are accessed and had no observers', () => {
    const obs1 = observable(1);

    let i = 0;
    const comp = computed(() => {
      i++;
      return obs1.value;
    });

    assert.equal(i, 1);

    autorun(() => {
      comp.value;
    });

    assert.equal(i, 2);
  })

  it('should not recalculate a computed if its observable is set to the same value', () => {
    const obs1 = observable(1);

    let i = 0;
    const comp = computed(() => {
      i++;
      return obs1.value;
    });

    autorun(() => {
      comp.value;
    });

    assert.equal(i, 2);

    obs1.value = 1;
    assert.equal(i, 2);

    obs1.value = 2;
    assert.equal(i, 3);

    obs1.value = 2;
    assert.equal(i, 3);
  })

  it('should handle nested computeds', () => {
    const obs1 = observable(1);
    const obs2 = observable(2);

    const computed1 = computed(() => obs1.value);
    const computed2 = computed(() => obs2.value);
    const computed3 = computed(() => computed1.value + computed2.value);

    autorun(() => {
      computed3.value;
    })

    assert.equal(computed3.value, 3);

    obs1.value = 3;

    assert.equal(computed3.value, 5);
  });

  it('should rerun whenever anything changes', () => {
    const obs1 = observable(1);
    const obs2 = observable(2);

    const computed1 = computed(() => obs1.value);
    const computed2 = computed(() => obs2.value);
    const computed3 = computed(() => computed1.value + computed2.value);

    let i = 0;
    autorun(() => {
      i++;
      computed3.value;
    })

    assert.equal(i, 1);

    obs1.value = 2;
    assert.equal(i, 2);

    obs2.value = 2;
    assert.equal(i, 2);

    obs2.value = 3;
    assert.equal(i, 3);
  });
});
