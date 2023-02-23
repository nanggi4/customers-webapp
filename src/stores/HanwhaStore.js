/* global */
import { observable } from 'mobx';

const hanwhaStore = observable({
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
  exportAfccdCsv(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'export-afccd-csv',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  },
  getAfccdList(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-afccd-list',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });
  },
  getTargetList(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-target-list',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  },
  getTargetSettingList(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-target-setting-list',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  }, 
  getNaverAdsTotal(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-naver-ads-total-cost',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  }, 
  getNaverGfaTotal(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-naver-gfa-total-cost',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  },   
  getKakaoTotal(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-kakao-total-cost',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  },
  getFacebookTotal(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'get-facebook-total-cost',
      method: 'get',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });    
  },  
  putAfccd(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'put-afccd',
      method: 'post',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });
  },  
  insertExcel(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'put-excel',
      method: 'post',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });
  },
  putDayTarget(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'put-day-target',
      method: 'post',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });
  },
  putMonthTarget(param){
    param.connectionStore.request({
      service: process.env.CONST_THIS_PRODUCTNAME,
      action: 'put-month-target',
      method: 'post',
      data: param.data,
      currentAccount: param.currentAccount,
      callback: param.callback
    });
  }  
});

export { hanwhaStore };