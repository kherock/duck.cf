import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { cloneDeep } from 'lodash';

export interface State {
}

export class AppState {
  private store = new BehaviorSubject<State>({ clicked: false });
  changes = this.store.asObservable().distinctUntilChanged();

  get(prop?: string) {
    return prop ? this.store.value[prop] : this.store.value;
  }

  set(prop: State | string, value?: any) {
    if (typeof prop !== 'string') return this.store.next(prop);
    const state = cloneDeep(this.get());
    state[prop] = value;
    this.store.next(state);
  }
}