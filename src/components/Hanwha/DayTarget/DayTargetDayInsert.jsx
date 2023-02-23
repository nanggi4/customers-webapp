/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`DayTargetDayInsert::Loaded`);
//==============================================================
const DayTargetDayInsert = (props) => {
  const { } = useStore();
  const { } = useSnackbar();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2} className={clsx(props.classes.container)}>
        <Grid item xs={2}>
          <TextField
            id='today-date'
            variant='outlined'
            size='small'
            label={'날짜 (YYYY-MM-DD)'}
            onChange={(e) => props.setDayTargetDate(e.target.value)}
            value={props.dayTargetDate?props.dayTargetDate:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='today-consultant'
            variant='outlined'
            size='small'
            label={'오늘 상담원 수'}
            onChange={(e) => props.setDayTodayConsultant(e.target.value)}
            value={props.dayTodayConsultant?props.dayTodayConsultant:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='main-target'
            variant='outlined'
            size='small'
            label={'주력 상품'}
            onChange={(e) => props.setDayMainTarget(e.target.value)}
            value={props.dayMainTarget?props.dayMainTarget:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='non-main-target'
            variant='outlined'
            size='small'
            label={'비주력 상품'}
            onChange={(e) => props.setDayNonMainTarget(e.target.value)}
            value={props.dayNonMainTarget?props.dayNonMainTarget:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid> 
        <Grid item xs={2}>
          <TextField
            id='hanwha-pick-target'
            variant='outlined'
            size='small'
            label={'한화 픽'}
            onChange={(e) => props.setDayHanwhaPickTarget(e.target.value)}
            value={props.dayHanwhaPickTarget?props.dayHanwhaPickTarget:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button 
            onClick={(e) => props.putDayTarget({
              dayTargetDate: props.dayTargetDate,
              dayTodayConsultant: props.dayTodayConsultant,
              dayMainTarget: props.dayMainTarget,
              dayNonMainTarget: props.dayNonMainTarget,
              dayHanwhaPickTarget: props.dayHanwhaPickTarget
            })} 
            variant="outlined" 
            size="small"
          >
            {props.dayIdx ? "수정" : "추가"}
          </Button>
        </Grid>
      </Grid>      
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
//==============================================================
export default withStyles(styles)(DayTargetDayInsert);