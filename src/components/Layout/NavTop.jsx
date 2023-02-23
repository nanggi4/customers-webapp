/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../lib/useStore';
import { Container, Box } from '@material-ui/core';
//====================================================================
// logger.debug(`MainTopNav::Loaded`);
//====================================================================
const MainTopNav = (props) => {
  const { menuStore } = useStore();
  //====================================================================
  // Function
  //====================================================================
  useEffect(() => {
    return () => {};
  });
  //====================================================================
  return useObserver(() => (
    <React.Fragment>    
      <Container maxWidth='false' className={clsx(props.classes.container)}>
        <Box component="div" className={clsx(props.classes.wrap)}>
          <p>
            {menuStore.title==="home"?(
              <p>홈</p>
            ):(
              <p>
                {menuStore.title}
              </p>
            )}
          </p>
        </Box>
      </Container>
    </React.Fragment>      
  ));
};
//====================================================================
const styles = theme => ({
  container: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    padding: theme.spacing(0, 1),
    background: '#fff',
    zIndex: 100,
    right: 0
  },
  wrap: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
//====================================================================
export default withStyles(styles)(MainTopNav);
