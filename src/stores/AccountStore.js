/* global axios, logger, __SZKOITM, Cookies */
import { observable, action } from 'mobx';
import { API, Auth } from 'aws-amplify';
const accountStore = observable({
  setStoreValue(key, value) {
    if(typeof key === 'object') return;
    if(key.includes('.'))
    {
      let keys = key.split('.');
      this[keys[0]][keys[1]] = value;
    }
    else
    {
      this[key] = value;
    }
  },
  currentAccount: false,
  isValid: false,
  currentAccountDetail: {},
  async getCurrentAccountInfo(param){
    await Auth.currentUserInfo().then((obj) => {
      if(!obj) this.currentAccount = false;
      else this.currentAccount = obj;
      const currentEmailVerified = this.currentAccount.attributes.email_verified;
      const currentEmail = this.currentAccount.attributes.email;
      const currentName = this.currentAccount.attributes.name;
      this.checkValid(currentEmail, currentEmailVerified);
      this.getCurrentAccountDetail(currentName);
    })
    .catch((message) => {
    });
  },
  checkValid(email,verified){
    if(!verified) this.isValid = false;
    if(email.includes('email')){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
  },
  getCurrentAccountDetail(currentName){
  }
});

export { accountStore };