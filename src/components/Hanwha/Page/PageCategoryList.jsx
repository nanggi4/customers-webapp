/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useCommonStore } from '@datamplan/userconsole-webapp-builder';
import useStore from '../../../lib/useStore';
import { Grid } from '@material-ui/core';
//==============================================================
// logger.debug(`PageCategoryList::Loaded`);
//==============================================================
const PageCategoryList = (props) => {
  const { } = useCommonStore();
  const { } = useStore();
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>    
          <h3 className={clsx(props.classes.title)}>상품 목록</h3>
        </Grid>
        <Grid item xs={12}>    
          {props.categoryList&&(
            <Grid container spacing={1}>
              {props.categoryList.map(list => (
                <Grid item xs={12}>    
                  <span className={clsx(props.classes.leftTitle)}>{list.leftTitle}</span>
                  <h2 className={clsx(props.classes.mainTitle)}>{list.mainTitle}</h2>
                  <h3 className={clsx(props.classes.subTitle)}>{list.subTitle}</h3>
                  <p className={clsx(props.classes.hoverTitle)}>{list.hoverTitle}</p>
                </Grid>                                        
              ))}
            </Grid>
          )}
        </Grid>        
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
});
//==============================================================
export default withStyles(styles)(PageCategoryList);