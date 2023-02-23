/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button, Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import DayTargetDayInsert from './DayTargetDayInsert';
import DayTargetMonthInsert from './DayTargetMonthInsert';
import DayTargetTable from './DayTargetTable';
import DayTargetDayTable from './DayTargetDayTable';
import DayTargetMonthTable from './DayTargetMonthTable';
//==============================================================
// logger.debug(`DayTarget::Loaded`);
//==============================================================
const DayTarget = (props) => {
  const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  const { hanwhaStore, connectionStore, commonStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const [openDayInsert, setOpenDayInsert] = useState(false);
  const [openMonthInsert, setOpenMonthInsert] = useState(false);
  const [tabValue, setTabValue] = useState('list');
  const [targetList, setTargetList] = useState(false);
  const [dayTargetList, setDayTargetList] = useState(false);
  const [monthTargetList, setMonthTargetList] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [dayIdx, setDayIdx] = useState(false);
  const [dayTargetDate, setDayTargetDate] = useState(false);
  const [dayTodayConsultant, setDayTodayConsultant] = useState(false);
  const [dayMainTarget, setDayMainTarget] = useState(false);
  const [dayNonMainTarget, setDayNonMainTarget] = useState(false);
  const [dayHanwhaPickTarget, setDayHanwhaPickTarget] = useState(false);
  const [monthIdx, setMonthIdx] = useState(false);
  const [monthTargetYear, setMonthTargetYear] = useState(false);
  const [monthTargetMonth, setMonthTargetMonth] = useState(false);
  const [monthTargetCount, setMonthTargetCount] = useState(false);
  const [monthMainTarget, setMonthMainTarget] = useState(false);
  const [monthNonMainTarget, setMonthNonMainTarget] = useState(false);
  const [monthHanwhaPickTarget, setMonthHanwhaPickTarget] = useState(false);
  //==============================================================
  const handleToggleInsert = (target) => {
    if(target==='day') {
      if(!openDayInsert) setOpenDayInsert(true);
      if(openDayInsert) setOpenDayInsert(false);      
      setDayIdx(false);
      setDayTargetDate(false);
      setDayTodayConsultant(false);
      setDayMainTarget(false);
      setDayNonMainTarget(false);
      setDayHanwhaPickTarget(false);      
    }
    if(target==='month') {
      if(!openMonthInsert) setOpenMonthInsert(true);
      if(openMonthInsert) setOpenMonthInsert(false);
      setMonthIdx(false);
      setMonthTargetYear(false);
      setMonthTargetMonth(false);
      setMonthTargetCount(false);
      setMonthMainTarget(false);
      setMonthNonMainTarget(false);      
      setMonthHanwhaPickTarget(false);
    }    
  };
  //==============================================================
  const handleUpdateDayTarget = (row) => {
    if(!openDayInsert) setOpenDayInsert(true);
    setDayIdx(row.idx);
    setDayTargetDate(row.fullDate);
    setDayTodayConsultant(row.consultant);
    setDayMainTarget(row.mainTarget);
    setDayNonMainTarget(row.nonMainTarget);
    setDayHanwhaPickTarget(row.pickTarget);
  };
  //==============================================================
  const handleUpdateMonthTarget = (row) => {
    if(!openMonthInsert) setOpenMonthInsert(true);
    setMonthIdx(row.idx);
    setMonthTargetYear(row.YEAR);
    setMonthTargetMonth(row.MONTH);
    setMonthTargetCount(row.targetCount);
    setMonthMainTarget(row.mainTarget);
    setMonthNonMainTarget(row.nonMainTarget);      
    setMonthHanwhaPickTarget(row.pickTarget);
  };  
  //==============================================================
  const handleTab = (target) => {
    if(target==='list'){
      setTabValue('list');
      getTargetList();
    }else if(target==='setting'){
      setTabValue('setting');
      getTargetSettingList();      
    }
  };
  //==============================================================
  const getTargetList = () => {
    hanwhaStore.getTargetList({
      connectionStore,
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const result = _payload.isSuccess.sqlQueryResult;
          if(result.listQueryResult.length===0) {
            setIsEmpty(true);
          }else{
            setTargetList(result.listQueryResult); 
            setIsEmpty(false);
          }          
        }
        commonStore.setStoreValue('loading', false);
      }
    });    
  };
  //==============================================================
  const getTargetSettingList = () => {
    hanwhaStore.getTargetSettingList({
      connectionStore,
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const result = _payload.isSuccess.sqlQueryResult;
          if(result.daySettingResult.length===0||result.monthSettingResult.length===0) {
            setIsEmpty(true);
          }else{
            setDayTargetList(result.daySettingResult); 
            setMonthTargetList(result.monthSettingResult); 
            setIsEmpty(false);
          }          
        }
        if(commonStore.loading) commonStore.setStoreValue('loading', false);
      }
    }); 
  };    
  //==============================================================
  const putDayTarget = (dayTarget) => {
    const _dayTarget = convertDayTarget(dayTarget);
    //==============================================================
    if(_dayTarget===undefined) return;
    //==============================================================
    hanwhaStore.putDayTarget({
      connectionStore,
      data: {
        'put-day-target': _dayTarget
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const result = _payload.isSuccess.sqlQueryResult.queryResult;
          if(result.affectedRows===1) {
            if(tabValue==='list'&&!dayIdx) handleTab('setting');
            if(tabValue==='list'&&dayIdx) handleTab('list');
            if(tabValue==='setting') handleTab('setting');
            enqueueSnackbar(`정상적으로 처리 되었습니다.`, {variant:'success'});
          }else{
            commonStore.setStoreValue('loading', false);
            enqueueSnackbar(`오류가 발생 했습니다.`, {variant:'error'});
          }          
        }
      }
    });
  };
  //==============================================================
  const putMonthTarget = (monthTarget) => {
    const _monthTarget = convertMonthTarget(monthTarget);
    //===================================================================
    hanwhaStore.putMonthTarget({
      connectionStore,
      data: {
        'put-month-target': _monthTarget
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const result = _payload.isSuccess.sqlQueryResult.queryResult;
          if(result.affectedRows===1) {
            if(tabValue==='list'&&!monthIdx) handleTab('setting');
            if(tabValue==='list'&&monthIdx) handleTab('list');
            if(tabValue==='setting') handleTab('setting');            
            enqueueSnackbar(`정상적으로 처리 되었습니다.`, {variant:'success'});
          }else{
            commonStore.setStoreValue('loading', false);
            enqueueSnackbar(`오류가 발생 했습니다.`, {variant:'error'});
          }          
        }
      }
    });
  };
  //==============================================================
  const convertDayTarget = (dayTarget) => {
    try{
      for (const [key, value] of Object.entries(dayTarget)) {
        if(!value||value==='') {
          let title = '';
          if(key==='dayTargetDate') title = '날짜';
          if(key==='dayTodayConsultant') title = '오늘 상담원 수';
          if(key==='dayMainTarget') title = '주력 상품 수';
          if(key==='dayNonMainTarget') title = '비주력 상품 수';
          if(key==='dayHanwhaPickTarget') title = '한화 픽 상품 수';
          throw new Error(enqueueSnackbar(`${title}를 입력 해주세요.`, {variant:'error'}));
        }        
      }
      //==============================================================
      let _dayTarget = dayTarget;
      //==============================================================
      if(dayTarget['dayTargetDate'].length!==10&&dayTarget['dayTargetDate'].length!==8) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
      if(dayTarget['dayTargetDate'].length===10){
        const dateArray = dayTarget['dayTargetDate'].split('-');      
        if(dateArray.length!==3) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(dateArray[0])>2050) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(dateArray[1])>13) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(dateArray[2])>31) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        _dayTarget.fullDate = dayTarget['dayTargetDate'];
        _dayTarget.year = Number(dateArray[0]);
        _dayTarget.month = Number(dateArray[1]);
        _dayTarget.date = Number(dateArray[2]);
        _dayTarget.week = WEEK[new Date(dayTarget['dayTargetDate']).getDay()];
        if(dayIdx) _dayTarget.idx = dayIdx;
      }
      if(dayTarget['dayTargetDate'].length===8){
        const year = dayTarget['dayTargetDate'].substring(0,4);
        const month = dayTarget['dayTargetDate'].substring(4,6);
        const date = dayTarget['dayTargetDate'].substring(6,8);
        const fullDate = `${year}-${month}-${date}`;
        if(isNaN(dayTarget['dayTargetDate'])) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(year)>2050) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(month)>13) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        if(Number(date)>31) throw new Error(enqueueSnackbar(`입력날짜를 확인 해주세요.`, {variant:'error'}));
        _dayTarget.fullDate = fullDate;
        _dayTarget.year = Number(year);
        _dayTarget.month = Number(month);
        _dayTarget.date = Number(date);
        _dayTarget.week = WEEK[new Date(fullDate).getDay()];        
        if(dayIdx) _dayTarget.idx = dayIdx;
      } 
      //==============================================================
      return _dayTarget;
      //==============================================================
    }catch(e){
      return;
    }
  };
  //==============================================================
  const convertMonthTarget = (monthTarget) => {
    try{
      for (const [key, value] of Object.entries(monthTarget)) {
        if(!value||value==='') {
          let title = '';
          if(key==='monthTargetYear') title = '목표 년도';
          if(key==='monthTargetMonth') title = '목표 월';
          if(key==='monthTargetCount') title = '목표 건수';
          if(key==='monthMainTarget') title = '주력 상품';
          if(key==='monthNonMainTarget') title = '비주력 상품';
          if(key==='monthHanwhaPickTarget') title = '한화 픽';          
          throw new Error(enqueueSnackbar(`${title}를 입력 해주세요.`, {variant:'error'}));
        }        
      }
      //==============================================================
      if(Number(monthTarget['monthTargetYear'])>2050) throw new Error(enqueueSnackbar(`입력년도를 확인 해주세요.`, {variant:'error'}));
      if(Number(monthTarget['monthTargetMonth'])>13) throw new Error(enqueueSnackbar(`입력월을 확인 해주세요.`, {variant:'error'}));
      //==============================================================
      let _monthTarget = {
        year: Number(monthTarget['monthTargetYear']),
        month: Number(monthTarget['monthTargetMonth']),
        targetCount: Number(monthTarget['monthTargetCount']),
        mainTarget: Number(monthTarget['monthMainTarget']),
        nonMainTarget: Number(monthTarget['monthNonMainTarget']),
        hanwhaPickTarget: Number(monthTarget['monthHanwhaPickTarget']),
      };
      //==============================================================
      if(monthIdx) _monthTarget.idx = monthIdx;
      //==============================================================
      return _monthTarget;
      //==============================================================
    }catch(e){
      return;
    }
  };
  //==============================================================
  useEffect(() => {
    getTargetList();
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} className={clsx(props.classes.btnWrap, props.classes.wrap)}>
          <Box>
            <Button onClick={() => handleToggleInsert('day')} variant="outlined" size="small" className={clsx(props.classes.btn)}>일일목표 넣기</Button>
            <Button onClick={() => handleToggleInsert('month')} variant="outlined" size="small" className={clsx(props.classes.btn)}>월간목표 넣기</Button>
          </Box>
          <Box>
            <Button onClick={() => handleTab('list')} variant="outlined" size="small" className={clsx(props.classes.btn)}>일간목표 통계</Button>
            <Button onClick={() => handleTab('setting')} variant="outlined" size="small" className={clsx(props.classes.btn)}>목표 목록</Button>
          </Box>
        </Grid>
        {openDayInsert&&(
          <Grid item xs={12} className={clsx(props.classes.wrap)}>
            <DayTargetDayInsert
              dayIdx={dayIdx}
              setDayIdx={setDayIdx}
              dayTargetDate={dayTargetDate}
              setDayTargetDate={setDayTargetDate}
              dayTodayConsultant={dayTodayConsultant}
              setDayTodayConsultant={setDayTodayConsultant}
              dayMainTarget={dayMainTarget}
              setDayMainTarget={setDayMainTarget}
              dayNonMainTarget={dayNonMainTarget}
              setDayNonMainTarget={setDayNonMainTarget}
              dayHanwhaPickTarget={dayHanwhaPickTarget}
              setDayHanwhaPickTarget={setDayHanwhaPickTarget}
              putDayTarget={putDayTarget} 
            />
          </Grid>        
        )}
        {openMonthInsert&&(
          <Grid item xs={12} className={clsx(props.classes.wrap)}>
            <DayTargetMonthInsert 
              monthIdx={monthIdx}
              setMonthIdx={setMonthIdx}
              monthTargetYear={monthTargetYear}
              setMonthTargetYear={setMonthTargetYear}
              monthTargetMonth={monthTargetMonth}
              setMonthTargetMonth={setMonthTargetMonth}
              monthTargetCount={monthTargetCount}
              setMonthTargetCount={setMonthTargetCount}
              monthMainTarget={monthMainTarget}
              setMonthMainTarget={setMonthMainTarget}
              monthNonMainTarget={monthNonMainTarget}
              setMonthNonMainTarget={setMonthNonMainTarget}
              monthHanwhaPickTarget={monthHanwhaPickTarget}
              setMonthHanwhaPickTarget={setMonthHanwhaPickTarget}            
              putMonthTarget={putMonthTarget}
            />
          </Grid>        
        )}
        {tabValue==='list'&&(
          <React.Fragment>
            {targetList&&(
              <Grid item xs={12}>
                <DayTargetTable
                  isEmpty={isEmpty}
                  targetList={targetList}
                />
              </Grid>          
            )}
          </React.Fragment>
        )}
        {tabValue==='setting'&&(
          <React.Fragment>
            {(dayTargetList&&monthTargetList)&&(
              <React.Fragment>
                <Grid item xs={12}>
                  <DayTargetDayTable 
                    dayTargetList={dayTargetList}
                    handleUpdateDayTarget={handleUpdateDayTarget}
                  />
                </Grid> 
                <Grid item xs={12}>
                  <DayTargetMonthTable
                    monthTargetList={monthTargetList}
                    handleUpdateMonthTarget={handleUpdateMonthTarget}
                  />
                </Grid>         
              </React.Fragment>
            )}
          </React.Fragment>
        )}        
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  btnWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    marginRight: 8
  },
  wrap: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)' 
  }
});
//==============================================================
export default withStyles(styles)(DayTarget);