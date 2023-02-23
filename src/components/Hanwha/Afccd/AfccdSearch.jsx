/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Button, TextField, Box } from '@material-ui/core';
//==============================================================
// logger.debug(`AfccdSearch::Loaded`);
//==============================================================
const AfccdSearch = (props) => {
  const { } = useStore();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  const handleInput = (name, value) => {
    props.setSearchValue({ ...props.searchValue, [name]: value });
  };
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Box component="div" display="flex" className={clsx(props.classes.searchWrap)}>
        <TextField
          id='afccd'
          variant='outlined'
          size='small'
          label={'AFCCD'}
          onChange={(e) => handleInput('afccd', e.target.value)}
          style={{maxWidth: '200px'}}
          InputProps={{
            classes: {
              root: props.classes.textInput
            }
          }}
        />
        <TextField
          id='campaign'
          variant='outlined'
          size='small'
          label={'캠페인'}
          onChange={(e) => handleInput('campaign', e.target.value)}
          style={{marginLeft: '0.5rem', maxWidth: '200px'}}
          InputProps={{
            classes: {
              root: props.classes.textInput
            }
          }}
        />
        <Button onClick={(e) => props.getAfccdList()} variant="outlined" size="small" style={{marginLeft: '0.5rem'}}>검색</Button>
      </Box>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  searchWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
//==============================================================
export default withStyles(styles)(AfccdSearch);