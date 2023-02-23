/* global axios logger */
import { observable } from 'mobx';
//====================================================================
const targetConnectionStore = observable({
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
  request(param) {
    let _link = `_link`;
    if(param.setLoadingState) param.setLoadingState(true);
    if(param.setProgressState) param.setProgressState(true);
    let _request = {method: param.method,url: _link};
    if(param.method==='get') _request.params = param.data;
    if(param.method==='post') _request.data = param.data;
    // if (param.service==='development') {}
    if(param.isLogger) logger.debug(`${param.callName}::request::`, _request);
    axios.request(_request).then(function(response) {
      if(param.isLogger) logger.debug(`${param.callName}::response::`, response);
      param.callback(JSON.parse(response.data.Payload));
    });    
  },
  socketWS: false,
  socketState: 0,
  socketHistory: [],
  socketMessage: '',
  socketAction: '',
  socketStep: '',
  socketLastStep: '',
  socketClose() {
    let _this = this;
    const runCloseConnection = () => {
      return new Promise((resolve, reject) => {
        _this.socketWS.close();
        _this.setStoreValue('socketWS',false);
      });
    };
    (async () => {
      await runCloseConnection();
    })();
  },
  socketRequest(param) {
    const _this = this;
    const _WSS_SOCKET_URL = '_WSS_SOCKET_URL';
    let _ws = false;
    //=====================================================
    /*
    if(_this.socketState===1)
    {
      if(_this.socketWS) _this.socketWS.close();
    }
    */
    //=====================================================
    if(param.setLoadingState) param.setLoadingState(true);
    if(param.setProgressState) param.setProgressState(true);    
    //=====================================================
    const runOpenConnection = () => {
      return new Promise((resolve, reject) => {
        _ws = new WebSocket(_WSS_SOCKET_URL);
        _ws.onopen = () => {
          // console.log(`opened:readyState:${_ws.readyState}`);
          _this.setStoreValue('socketState',_ws.readyState);
          console.log('_ws open ===');
          resolve(); // go next
        };
        _ws.onclose = () => {
          // console.log(`closed:readyState:${_ws.readyState}`);
          _this.setStoreValue('socketState',_ws.readyState);
          _this.setStoreValue('_ws',false);
          console.log('_ws close ===');
          resolve(); // go next
        };
        _ws.onmessage = (message) => {
          // console.log(`message:readyState:${_ws.readyState}`);
          _this.setStoreValue('socketHistory',_this.socketHistory.concat(message));
          if(JSON.parse(message.data).hasOwnProperty('action')){
            _this.setStoreValue('socketMessage',JSON.parse(message.data)['message']);
            if(JSON.parse(message.data)['action'] === "run"){
              console.log('_ws message ===', message.data);
              _this.setStoreValue('socketAction',JSON.parse(message.data)['action']);
              _this.setStoreValue('socketHistory',_this.socketHistory.concat(message));
            }
            _this.setStoreValue('socketStep',JSON.parse(message.data)['step'].substr(1,1));
            _this.setStoreValue('socketLastStep',JSON.parse(message.data)['step'].substr(3,1));            
          }else{
            console.log('[1]', JSON.parse(message.data));
            if(JSON.parse(message.data).hasOwnProperty('Payload')) {
              if(JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.hasOwnProperty('failure')) {
                console.log('[2] _ws error message === failure');  
              }else{
                let payload = {};
                if(JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.hasOwnProperty('browser')){
                  console.log('[3]', JSON.parse(JSON.parse(message.data)['Payload']).isSuccess);
                  if(JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.targetResult===false){
                    param.callback('error');  
                  }else{
                    payload.name = JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.targetResult[0].search;
                    payload.result = JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.targetResult[0].ruleResult;                                        
                  }
                }else{
                  payload.name = JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.targetResult.name;
                  payload.result = JSON.parse(JSON.parse(message.data)['Payload']).isSuccess.targetResult.targetResult.targetList[0].contentList[0].result.value;                  
                }
                param.callback(payload);                
              }
            }else{
              console.log('[4] _ws error message ===', JSON.parse(message.data)['message']);
              if(JSON.parse(message.data)['message'] !== 'Endpoint request timed out') param.callback('error');
            }
          }
          resolve();
        };
        _this.setStoreValue('socketWS',_ws);
      });
    };
    const runSendMessage = () => {
      return new Promise((resolve, reject) => {
        param.data.action = 'runThis';
        _ws.send(JSON.stringify(param.data));
      });
    };
    //=====================================================
    (async () => {
      await runOpenConnection();
      await runSendMessage();
    })();      
  },
  cloneObject(obj) {
    let clone = {};
    for (let key in obj) {
      console.log(key);
    }
    return clone;
  }
});

export { targetConnectionStore };