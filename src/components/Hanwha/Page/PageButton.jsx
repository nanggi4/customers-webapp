/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`PageButton::Loaded`);
//==============================================================
const PageButton = (props) => {
  const { } = useStore();
  const { } = useSnackbar();
  const [kakao, setKakao] = useState(false);
  const [callBanner, setCallBanner] = useState(false);
  //==============================================================
  const toggleKakao = () => {
    setKakao(!kakao);
  };
  //==============================================================
  const toggleCallBanner = () => {
    setCallBanner(!callBanner);
  };  
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <FormGroup row={true} className={clsx(props.classes.switchWrap)}>
        <FormControlLabel
          control={<Switch checked={kakao} onChange={toggleKakao} color="primary" />}
          labelPlacement="top"
          label="카카오톡 상담하기"
        />
        <FormControlLabel
          control={<Switch checked={callBanner} onChange={toggleCallBanner} color="primary" />}
          labelPlacement="top"
          label="콜배너"
        />
      </FormGroup>        
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  switchWrap: {
    marginTop: '0.5rem'
  }
});
//==============================================================
export default withStyles(styles)(PageButton);