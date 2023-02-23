/* global CryptoJS, logger */
import React, { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, ClickAwayListener, Grow, IconButton, MenuList, MenuItem, Link as ALink, Paper, Popper, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Auth } from 'aws-amplify';
//==============================================================
const TopBar = (props) => {
  const useStore = props.useStore;
  //==============================================================
  const { paramStore, accountStore, uiStore } = useStore();
  const refPopper = useRef();
  const history = useHistory();  
  //==============================================================
  const signOut = async function() {
    try {
      accountStore.setStoreValue('currentAccount',false);
      await Auth.signOut();
      history.push('/signout');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };  
  //==============================================================
  useEffect(() => {}, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <AppBar className={clsx(props.classes.appbarTop, {})}>
        <Toolbar className={clsx(props.classes.toolbar)}>
          <div className={clsx(props.classes.titleBox)} flexGrow={1}>
            <Typography variant='title' className={clsx(props.classes.titleTypography)}>{paramStore.queryParams.servicePath?paramStore.queryParams.servicePath:''}</Typography>
          </div>
          <div>
            {!accountStore.currentAccount && (
              <ALink href='/signin' className={clsx(props.classes.signin)}>Sign in</ALink>
            )}
            {accountStore.currentAccount && (
              <React.Fragment>
                <IconButton
                  className={clsx(props.classes.menuListToggleButton)}
                  color='primary'
                  ref={refPopper}
                  aria-controls={uiStore.topAccountMenuOpen ? 'menu-list-grow' : undefined}
                  aria-haspopup='true'
                  onClick={(e)=>{uiStore.setStoreValue('topAccountMenuOpen',uiStore.topAccountMenuOpen?false:true)}}
                >
                  <AccountCircle className={clsx(props.classes.buttonIcon)} />
                </IconButton>
                <Popper open={uiStore.topAccountMenuOpen} anchorEl={refPopper.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper className={clsx(props.classes.menuListContainer)}>
                        <ClickAwayListener onClickAway={(e)=>{uiStore.setStoreValue('topAccountMenuOpen', false)}}>
                          <MenuList
                            className={clsx(props.classes.menuList)}
                            autoFocusItem={uiStore.topAccountMenuOpen} id='menu-list-grow'
                            onKeyDown={(e)=>{}}
                          >
                            <MenuItem component={Link} to={location=>({...location,pathname:'/dashboard',search:false})}>dashboard</MenuItem>
                            <MenuItem component={Link} to={location=>({...location,pathname:'/setting',search:false})}>setting</MenuItem>
                            <MenuItem onClick={(e)=>signOut()}>logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>
            )}
          </div>          
        </Toolbar>
      </AppBar>
    </React.Fragment>
  ));
};
//==============================================================
const styles = theme => ({
  appbarTop: {
    position: 'fixed',
    margin: 0,
    padding: '0!important',
    background: 'none',
    transition: theme.transitions.create(['margin', 'width', 'backgroundColor'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_LG)]: {
      // backgroundColor:'black',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_MD)]: {
      // backgroundColor:'green',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_SM)]: {
      // backgroundColor:'blue',
    },
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      position: 'static',
      // backgroundColor:'red',
    },
    zIndex: 2000,
    boxShadow: 'none'
  },
  toolbar: {
    /*
    backgroundColor: process.env.CONST_MATERIALUI_THEME_PALETTE_PRIMARY_DARK,
    minHeight: theme.spacing(parseInt(process.env.THEME_HEIGHT_TOPBAR,10)),
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      
    },
    */
    backgroundColor: '#fff',
    minHeight: 65,
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      
    },
    // borderBottom: '1px solid #f5f5f5'
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  titleBox: {
    flexGrow: 1,
    overflow: 'hidden'
  },
  titleTypography: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#000',
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  signin: {
    color: '#000',
  },
  userName: {
    display: 'inline-block',
    padding: '0 10px'
  },
  menuListToggleButton: {
    padding: 0
  },
  buttonIcon: {
    width: '1.25em',
    height: '1.25em'
  }
});
//==============================================================
export default withStyles(styles,{withTheme:true})(TopBar);