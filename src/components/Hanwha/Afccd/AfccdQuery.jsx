/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`AfccdQuery::Loaded`);
//==============================================================
const AfccdQuery = (props) => {
  const { } = useSnackbar();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      {props.insertQuery&&props.insertQuery}
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  
});
//==============================================================
export default withStyles(styles)(AfccdQuery);