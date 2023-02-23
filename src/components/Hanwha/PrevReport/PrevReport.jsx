/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button } from '@material-ui/core';
import { useSnackbar} from 'notistack';
import PrevReportInsert from './PrevReportInsert';
import PrevReportList from './PrevReportList';
//==============================================================
// logger.debug(`PrevReport::Loaded`);
//==============================================================
const PrevReport = (props) => {
  const { hanwhaStore, connectionStore, commonStore } = useStore();
  const [openInsert, setOpenInsert] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [reportDate, setReportDate] = useState(false);
  const [newItemSearch, setNewItemSearch] = useState(false);
  const [brandSearch, setBrandSearch] = useState(false);
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={openList?9:12}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={clsx(props.classes.wrap)}>
              <Button onClick={() => setOpenInsert(!openInsert)} variant="outlined" size="small" className={clsx(props.classes.btn)}>보고서 생성</Button>
              <Button onClick={() => setOpenList(!openList)} variant="outlined" size="small" className={clsx(props.classes.btn)}>보고서 목록</Button>
            </Grid>
            {openInsert&&(
              <Grid item xs={12} className={clsx(props.classes.wrap)}>
                <PrevReportInsert 
                  reportDate={reportDate}
                  setReportDate={setReportDate}
                  newItemSearch={newItemSearch}
                  setNewItemSearch={setNewItemSearch}
                  brandSearch={brandSearch}
                  setBrandSearch={setBrandSearch}
                />
              </Grid>            
            )}
            <Grid item xs={12}>
              test
            </Grid>          
          </Grid>
        </Grid>
        {openList&&(
          <Grid item xs={3}>
            <PrevReportList />
          </Grid>        
        )}
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  btn: {
    marginRight: 8 
  },
  wrap: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)' 
  }  
});
//==============================================================
export default withStyles(styles)(PrevReport);