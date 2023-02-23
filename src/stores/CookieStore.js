/* global */
import { observable } from 'mobx';

const cookieStore = observable({
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
  afccd: false,
  afccdCount: false,
  afccdLimit: false,
  afccdPage: false,
  dayTargetList: false,
  dayTargetSetting: false,
  monthTargetSetting: false
});

export { cookieStore };
