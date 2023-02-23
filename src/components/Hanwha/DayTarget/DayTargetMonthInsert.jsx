/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`DayTargetMonthInsert::Loaded`);
//==============================================================
const DayTargetMonthInsert = (props) => {
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
        <Grid item xs={1}>
          <TextField
            type='number'
            id='today-consultant'
            variant='outlined'
            size='small'
            label={'목표 년도'}
            onChange={(e) => props.setMonthTargetYear(e.target.value)}
            value={props.monthTargetYear?props.monthTargetYear:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid> 
        <Grid item xs={1}>
          <TextField
            type='number'
            id='today-consultant'
            variant='outlined'
            size='small'
            label={'목표 월'}
            onChange={(e) => props.setMonthTargetMonth(e.target.value)}
            value={props.monthTargetMonth?props.monthTargetMonth:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              classes: {
                root: props.classes.textInput
              }
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            type='number'
            id='today-consultant'
            variant='outlined'
            size='small'
            label={'목표 건수'}
            onChange={(e) => props.setMonthTargetCount(e.target.value)}
            value={props.monthTargetCount?props.monthTargetCount:''}
            style={{margin:0, width: '100%'}}
            InputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
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
            onChange={(e) => props.setMonthMainTarget(e.target.value)}
            value={props.monthMainTarget?props.monthMainTarget:''}
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
            onChange={(e) => props.setMonthNonMainTarget(e.target.value)}
            value={props.monthNonMainTarget?props.monthNonMainTarget:''}
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
            onChange={(e) => props.setMonthHanwhaPickTarget(e.target.value)}
            value={props.monthHanwhaPickTarget?props.monthHanwhaPickTarget:''}
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
            onClick={(e) => props.putMonthTarget({
              monthTargetYear: props.monthTargetYear,
              monthTargetMonth: props.monthTargetMonth,
              monthTargetCount: props.monthTargetCount,
              monthMainTarget: props.monthMainTarget,
              monthNonMainTarget: props.monthNonMainTarget,
              monthHanwhaPickTarget: props.monthHanwhaPickTarget
            })}           
            variant="outlined"
            size="small"
          >
            {props.monthIdx ? "수정" : "추가"}
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
export default withStyles(styles)(DayTargetMonthInsert);