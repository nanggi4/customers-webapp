/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`PrevReportInsert::Loaded`);
//==============================================================
const PrevReportInsert = (props) => {
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
        <Grid item xs={3}>
          <TextField
            id='today-date'
            variant='outlined'
            size='small'
            label={'보고서 날짜 (YYYY-MM-DD)'}
            onChange={(e) => props.setReportDate(e.target.value)}
            value={props.reportDate?props.reportDate:''}
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
            label={'신제품검색'}
            onChange={(e) => props.setNewItemSearch(e.target.value)}
            value={props.newItemSearch?props.newItemSearch:''}
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
            label={'브랜드검색'}
            onChange={(e) => props.setBrandSearch(e.target.value)}
            value={props.brandSearch?props.brandSearch:''}
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
            onClick={async (e) => props.getPrevReport(e)} 
            variant="outlined" 
            size="small"
          >
            {props.dayIdx ? "수정" : "생성"}
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
export default withStyles(styles)(PrevReportInsert);