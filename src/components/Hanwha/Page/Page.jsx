/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PageButton from './PageButton';
import PageCategory from './PageCategory';
import PageContent from './PageContent';
//==============================================================
// logger.debug(`Page::Loaded`);
//==============================================================
const Page = (props) => {
  const { } = useStore();
  const [tabValue, setTabValue] = useState('button');
  const { enqueueSnackbar } = useSnackbar();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}} className={clsx(props.classes.btnWrap)}>
          <Button onClick={() => setTabValue('button')} variant="outlined" size="small" style={{marginRight: 8}}>버튼 ON/OFF</Button>
          <Button onClick={() => setTabValue('category')} variant="outlined" size="small" style={{marginRight: 8}}>메인페이지 하단 상품목록</Button>
          <Button onClick={() => setTabValue('content')} variant="outlined" size="small">페이지 내용</Button>
        </Grid>
        {tabValue==='button'&&(
          <Grid item xs={12}>
            <PageButton />
          </Grid>          
        )}
        {tabValue==='category'&&(
          <Grid item xs={12}>
            <PageCategory />
          </Grid>          
        )}
        {tabValue==='content'&&(
          <Grid item xs={12}>
            <PageContent />
          </Grid>          
        )}        
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  
});
//==============================================================
export default withStyles(styles)(Page);