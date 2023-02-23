/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../lib/useStore';
import { Container, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LoadingIndicator from './LoadingIndicator';
import Nav from './Layout/Nav';
import NavTop from './Layout/NavTop';
import Hanwha from './Hanwha/Hanwha';
import Home from './Home/Index';
//==============================================================
// logger.debug(`MainContainer::Loaded`);
//==============================================================
const MainContainer = (props) => {
  const { commonStore, menuStore, accountStore } = useStore();
  const [navOpen, setNavOpen] = useState(true);
  const [userEmail] = useState(accountStore['currentAccount']['attributes']['email'].split('@')[1]);
  //==============================================================
  const toggleNavOpen = () => {
    setNavOpen(!navOpen);
  };
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      {commonStore.loading&&(
        <LoadingIndicator />
      )}    
      <Container maxWidth='false' className={clsx(props.classes.container)}>
        {userEmail!=='mplanit.co.kr'?(
          <b>권한이 없습니다. 😅</b>
        ):(
          <React.Fragment>
            <IconButton aria-label="toggle-nav" className={clsx(props.classes.navBtn)} onClick={() => toggleNavOpen()} >
              <MenuIcon fontSize="small" style={{color: '#000'}} />
            </IconButton>
            <Grid container spacing={0}>
              {navOpen&&(
                <Grid item xs={1}>        
                  <Nav />
                </Grid>          
              )}
              <Grid item xs={navOpen?11:12} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
                <NavTop />
                <Container maxWidth='false' className={clsx(props.classes.contentContainer)}>
                  {(!menuStore.menu1||menuStore.menu1==='home')&&(
                    <Home />
                  )}            
                  {menuStore.menu1==='hanwha'&&(
                    <Hanwha />
                  )}
                </Container>
              </Grid>          
            </Grid>          
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  ));
};
//==============================================================
const styles = theme => ({
  container: {
    height: '100%',
    padding: 0
  },
  contentContainer: {
    padding: theme.spacing(1)
  },
  navBtn: {
    position: 'fixed',
    bottom: 15,
    left: 15,
    zIndex: 2000,
    background: '#fff',
    "&:hover": {
      backgroundColor: '#f5f5f5'
    },
    border: '1px solid rgba(0, 0, 0, 0.12)'
  }
});
//==============================================================
export default withStyles(styles)(MainContainer);