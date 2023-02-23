/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PageCategoryInsert from './PageCategoryInsert';
import PageCategoryList from './PageCategoryList';
import PageCategoryData from './PageCategoryData.json';
//==============================================================
// logger.debug(`PageCategory::Loaded`);
//==============================================================
const PageCategory = (props) => {
  const { } = useStore();
  const { } = useSnackbar();
  const [categoryList, setCategoryList] = useState(false);
  //==============================================================
  const getCategoryList = () => {
    setCategoryList(PageCategoryData);
  };
  //==============================================================
  const putCategory = () => {
  };  
  //==============================================================
  useEffect(() => {
    getCategoryList();
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {categoryList&&(
            <PageCategoryList 
              categoryList={categoryList}
              putCategory={putCategory}
            />          
          )}
        </Grid>
        <Grid item xs={2}>
          <PageCategoryInsert 
            putCategory={putCategory}
          />
        </Grid>        
      </Grid>
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
export default withStyles(styles)(PageCategory);