/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useCommonStore } from '@datamplan/userconsole-webapp-builder';
import useStore from '../../../lib/useStore';
import { } from '@material-ui/core';
//====================================================================
// logger.debug(`Default::Loaded`);
//====================================================================
const Default = (props) => {
  const { } = useCommonStore();
  const { } = useStore();
  //====================================================================
  useEffect(() => {
    return () => {};
  }, []);
  //====================================================================
  return useObserver(() => (
    <React.Fragment>
      <Container maxWidth='false' className={clsx(props.classes.container)}>
      </Container>
    </React.Fragment>      
  ));
};
//====================================================================
const styles = theme => ({
});
//====================================================================
export default withStyles(styles)(Default);