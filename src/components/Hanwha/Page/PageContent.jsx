/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`PageContent::Loaded`);
//==============================================================
const PageContent = (props) => {
  const { } = useStore();
  const { } = useSnackbar();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}} className={clsx(props.classes.btnWrap)}>
          <Button onClick={() => console.log('123')} variant="outlined" size="small">페이지 추가</Button>
          <Box component="div" display="flex">
            
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  btnWrap: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
//==============================================================
export default withStyles(styles)(PageContent);