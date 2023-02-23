/* global */
import { observable } from 'mobx';

const commonStore = observable({
  setStoreValue(key, value) {
    if (typeof key === 'object') return;
    if (key.includes('.')) {
      let keys = key.split('.');
      this[keys[0]][keys[1]] = value;
    }
    else {
      this[key] = value;
    }
  },
  loading: false
});

export { commonStore };