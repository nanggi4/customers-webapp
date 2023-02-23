/* global */
import { observable } from 'mobx';

const utilStore = observable({
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
  sortData(data, id, order){
    let _items = data.slice().sort((a, b) => {
        if (order === 'asc') {
          if(a[id] === null || a[id] > b[id]) { return 1; }
          if(b[id] === null || a[id] < b[id]) { return -1; }
        } else {
          if(a[id] === null || a[id] < b[id]) { return 1; }
          if(b[id] === null || a[id] > b[id]) { return -1; }
        }
        return 0;
    });
    return _items;
  },
  convertTimestamp(mysqlTimeString){
    const dateTime = mysqlTimeString;
    if(mysqlTimeString)
    {
      let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
      let convertedResult = `${dateTimeParts[0]}-${dateTimeParts[1]}-${dateTimeParts[2].replace('T',' ')}:${dateTimeParts[3]}`;
      return convertedResult;
    }
    else
    {
      return '';
    }
  },
});

export { utilStore };
