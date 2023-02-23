/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../lib/useStore';
import MainContainer from './MainContainer';
//==============================================================
// logger.debug(`ContentContainer::Loaded`);
//==============================================================
const ContentContainer = (props) => {
  const { paramStore, accountStore } = useStore();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <div className={clsx(props.classes.outBox)}>
        {paramStore.queryParams.servicePath===process.env.CONST_PRODUCTNAME_CUSTOMERS&&accountStore.currentAccount&&(
          <React.Fragment>
            <MainContainer />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  ));
};
//==============================================================
const styles = theme => ({
  disabled: {},
  selected: {},
  outBox: {
    width: '100%',
    // height: `calc((100vh - ${theme.spacing(parseInt(process.env.THEME_HEIGHT_TOPBAR,10))}px))`
    minHeight: 'calc((100vh - 65px))',
    height: '100%',
    background: '#fff'
  },
});
//==============================================================
export default withStyles(styles)(ContentContainer);