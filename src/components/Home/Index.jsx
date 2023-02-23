/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useCommonStore } from '@datamplan/userconsole-webapp-builder';
import useStore from '../../lib/useStore';
import { Container, Typography, Grid, Button } from '@material-ui/core';
//==============================================================
// logger.debug(`Home_Index::Loaded`);
//==============================================================
const Index = (props) => {
  const { } = useCommonStore();
  const { hanwhaStore, connectionStore, commonStore, cookieStore } = useStore();
  //==============================================================
  const getNaverGfaTotal = (data) => {
    hanwhaStore.getNaverGfaTotal({
      connectionStore,
      data: {},
      callback:(_payload)=>{
        if(_payload.isSuccess){
        }
      }
    });
  };  
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Container maxWidth='false' className={clsx(props.classes.container)}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={clsx(props.classes.btnWrap)}>
            <Button onClick={() => getNaverGfaTotal()} variant="outlined" size="small" style={{marginRight: 8}}>퍼펫티어 테스트</Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  container: {
    padding: 0
  }
});
//==============================================================
export default withStyles(styles)(Index);