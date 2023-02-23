/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, FormControl, Select, MenuItem, TextField, Container, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
//==============================================================
// logger.debug(`PageCategory::Loaded`);
//==============================================================
const PageCategory = (props) => {
  const { } = useStore();
  const { } = useSnackbar();
  const [category, setCategory] = useState("");
  const [leftTitle, setLeftTitle] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={clsx(props.classes.writeFormWrap)}>
        <form className={props.classes.writeForm} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h3 className={clsx(props.classes.formTitle)}>상품 등록</h3>
            </Grid>
            <Grid item xs={12}>
              <h4 className={clsx(props.classes.writeFormTitle)}>카테고리</h4>                    
              <FormControl variant="outlined" className={props.classes.formControl}>
                <Select
                  labelId="item-category"
                  id="item-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  className={props.classes.selectBox}
                >
                  <MenuItem value={1}>종합건강/유병자</MenuItem>
                  <MenuItem value={2}>암/어린이</MenuItem>
                  <MenuItem value={3}>화재/간병</MenuItem>
                  <MenuItem value={4}>운전자/골프</MenuItem>
                </Select>
              </FormControl>             
            </Grid>
            <Grid item xs={12}>
              <h4 className={clsx(props.classes.writeFormTitle)}>왼쪽상단 문구</h4>                    
              <TextField 
                id="leftTitle" 
                placeholder="왼쪽상단 문구"
                variant="outlined" 
                fullWidth={true} 
                InputProps={{
                  classes: {
                    root: clsx(props.classes.writeFormText),
                    input: clsx(props.classes.writeFormInput)
                  }
                }}
                value={leftTitle}
                onChange={(e) => setLeftTitle(e.target.value)}
              />              
            </Grid> 
            <Grid item xs={12}>
              <h4 className={clsx(props.classes.writeFormTitle)}>메인 문구</h4>                    
              <TextField 
                id="mainTitle" 
                placeholder="메인 문구"
                variant="outlined" 
                fullWidth={true} 
                InputProps={{
                  classes: {
                    root: clsx(props.classes.writeFormText),
                    input: clsx(props.classes.writeFormInput)
                  }
                }}
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />              
            </Grid>
            <Grid item xs={12}>
              <h4 className={clsx(props.classes.writeFormTitle)}>서브 문구</h4>                    
              <TextField 
                id="subTitle" 
                placeholder="서브 문구"
                variant="outlined" 
                fullWidth={true} 
                InputProps={{
                  classes: {
                    root: clsx(props.classes.writeFormText),
                    input: clsx(props.classes.writeFormInput)
                  }
                }}
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />              
            </Grid>
            <Grid item xs={12}>
              <h4 className={clsx(props.classes.writeFormTitle)}>마우스올릴시 나오는 문구</h4>                    
              <TextField 
                id="hoverTitle" 
                placeholder="마우스올릴시 나오는 문구"
                variant="outlined" 
                fullWidth={true} 
                InputProps={{
                  classes: {
                    root: clsx(props.classes.writeFormText),
                    input: clsx(props.classes.writeFormInput)
                  }
                }}
                value={hoverTitle}
                onChange={(e) => setHoverTitle(e.target.value)}
              />              
            </Grid>             
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                className={clsx(props.classes.submitBtn)}
                onClick={(e) => props.handleSubmit(e, props.writeData)}
              >
                등록
              </Button>              
            </Grid>            
          </Grid>
        </form>
      </Container>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  formTitle: {
    margin: '0',
    textAlign: 'left'
  },
  writeFormWrap: {
    padding: 0,
    margin: 0,
    maxWidth: '100%',
    position: 'sticky',
    top: 40
  },
  writeFormTitle: {
    margin: '0 0 0.3rem',
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)'
  },
  writeFormRequire: {
    color: '#ff0000',
    marginLeft: 3
  },
  writeFormText: {
    margin: 0
  },
  writeFormInput: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    padding: '12px 10px',
    background: '#fff'
  },
  writeFormTextarea: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    padding: '15px 10px',
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.23);',
    borderRadius: 4,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  writeFormSelect: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    width: '100%'
  },
  radioTitle: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)'    
  },
  writeFormSelectWrap: {
    margin: 0
  },
  writeFormSelectInput: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    padding: '12px 10px',
    background: '#fff'
  },
  writeFormSelectList: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    padding: '10px'        
  },
  writeFormRadioWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  writeFormRadioInputLabel: {
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    marginRight: '0.5rem',
    display: 'flex',
    alignItems: 'center'
  },
  writeFormRadioInput: {
    margin: 0,
    marginRight: '0.3rem'
  },
  writeFormCheck: {
    display: 'flex'
  },
  writeFormCheckWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'skew(-0.05deg)',
    marginRight: '0.5rem'
  },
  submitBtn: {
    transform: 'skew(-0.05deg)'
  },
  formControl: {
    width: '100%'
  },
  selectBox: {
    fontSize: '0.9rem'
  }
});
//==============================================================
export default withStyles(styles)(PageCategory);