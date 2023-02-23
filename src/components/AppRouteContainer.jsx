/* global */
import React from 'react';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import clsx from 'clsx';
import UserconsoleTheme from './Theme.js';
import TopBar from './TopBar';
import useStore from '../lib/useStore';
import { SnackbarProvider } from 'notistack';
//==============================================================
const HEIGHT_TOPBAR = 40;
//==============================================================
const AppRouteContainer = (props) => {
  const ServiceWrapperBlock = () => {
    return (
      <React.Fragment>  
        <MuiThemeProvider theme={UserconsoleTheme}>
          <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} autoHideDuration={1800}>
            <CssBaseline />
            <TopBar useStore={useStore} />
            <main className={clsx(props.classes.mainContainer)}>
              {<span className={clsx(props.classes.mainVersion)} id="mainVersion">v{props.packageVersion}</span>}
              <props.application />
            </main>        
          </SnackbarProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  };
  return (
    <ServiceWrapperBlock />
  );
};
//==============================================================
const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block',
    margin: 0,
    /*padding: theme.spacing(1, 0, 0, 0),*/
    paddingTop: 65,
    position: 'relative',
    height: '100%'
  },
  mainVersion: {
    position: 'absolute',
    top: 8,
    right: 10,
    fontSize: '0.8rem'
  },
});
//==============================================================
export default withStyles(styles,{withTheme:true})(AppRouteContainer);