/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../lib/useStore';
import { Drawer, Divider, ListItem } from '@material-ui/core';
// import { ExpandLess, ExpandMore } from '@material-ui/icons';
//====================================================================
// logger.debug(`Nav::Loaded`);
//====================================================================
const Nav = (props) => {
  const { menuStore } = useStore();
  //====================================================================
  const handleMenu = (menu1, menu2, title) => {
    menuStore.setStoreValue('menu1', menu1);
    menuStore.setStoreValue('menu2', menu2);
    menuStore.setStoreValue('title', title);
  };
  //====================================================================
  useEffect(() => {
    return () => {};
  }, []);
  //====================================================================
  return useObserver(() => (
    <React.Fragment>    
      <Drawer
        className={clsx(props.classes.drawer)}
        variant="permanent"
        classes={{
          paper: clsx(props.classes.drawerPaper),
        }}
        anchor="left"
      >
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('home', 'home', '홈')}>
          홈
        </ListItem>
        <Divider />      
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('hanwha', 'afccd', 'AFCCD')}>
          한화
        </ListItem>
        <Divider />
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('hanwha', 'afccd', 'AFCCD')}>
          AFCCD
        </ListItem>
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('hanwha', 'dayTarget', '일일목표')}>
          일일목표
        </ListItem>
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('hanwha', 'prevReport', '전일자 광고 보고서')}>
          전일자 광고 보고서
        </ListItem>                                    
        <ListItem button className={clsx(props.classes.depth1)} onClick={() => handleMenu('hanwha', 'page', '페이지 관리')}>
          페이지 관리
        </ListItem> 
      </Drawer>
    </React.Fragment>      
  ));
};
//====================================================================
const styles = theme => ({
  drawer: {
    width: '100%',
    flexShrink: 0,
    height: '100%'
  },
  drawerPaper: {
    width: '100%',
    position: 'relative',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(2.5),
  }, 
  depth1: {
    // borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    fontSize: '0.875rem'
  },
  formControl: {
    width: '100%',
    padding: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  },
  title: {
    margin: 0
  },
  select: {
    width: '100%'
  },
  selectMenu:{ 
    padding: '6px 15px',
    fontSize: '0.85rem'
  },
  levelTitle: {
    margin: '0 0 0.5rem'
  },
  levelTitle2: {
    float: 'left',
    margin: '0 0 0.15rem',
    width: '33.333%'
  },  
  formTitle: {
    textAlign: 'center',
    margin: '0 0 0.5rem'
  },
  modal: {
    backgroundColor: 'transparent!important'
  },
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  modalBox: {
    padding: '1rem',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
    background: '#fff',
    width: '50%'
  },
  btn: {
    marginTop: 4
  },
  levelContent: {
    margin: 0
  },
  modalBoxContent: {
    padding: 0,
    margin: 0,
    float: 'left',
    width: '50%'
  },
  modalBoxLi: {
    margin: '0.5rem 0 0',
    padding: 0,
    listStyle: 'none',
    float: 'left',
    width: '50%'    
  },
  menuItem: {
    fontSize: '0.85rem',
    padding: '0.25rem 1rem'
  }
});
//====================================================================
export default withStyles(styles)(Nav);
