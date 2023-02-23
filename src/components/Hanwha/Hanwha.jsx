/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../lib/useStore';
import { Grid, Box } from '@material-ui/core';
import Afccd from './Afccd/Afccd';
import DayTarget from './DayTarget/DayTarget';
import PrevReport from './PrevReport/PrevReport';
import Page from './Page/Page';
//==============================================================
// logger.debug(`Hanwha::Loaded`);
//==============================================================
const Hanwha = (props) => {
  const { menuStore } = useStore();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Box className={props.classes.container} component="div" display="block">
        <Grid container spacing={0}>
          {menuStore.menu2==='afccd'&&(
            <Grid item xs={12}>    
              <Afccd />
            </Grid>          
          )}        
          {menuStore.menu2==='dayTarget'&&(
            <Grid item xs={12}>    
              <DayTarget />
            </Grid>          
          )}
          {menuStore.menu2==='prevReport'&&(
            <Grid item xs={12}>    
              <PrevReport />
            </Grid>          
          )}          
          {menuStore.menu2==='page'&&(
            <Grid item xs={12}>    
              <Page />
            </Grid>          
          )}          
        </Grid>
      </Box>
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
export default withStyles(styles)(Hanwha);