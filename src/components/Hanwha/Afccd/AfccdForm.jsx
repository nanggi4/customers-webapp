/* global logger */
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { useSnackbar } from 'notistack';
import { Container, Grid, TextField, Button } from '@material-ui/core';
//==============================================================
// logger.debug(`AfccdForm::Loaded`);
//==============================================================
const AfccdForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { } = useStore();
  const formData = [
    {
      label: '미디어',
      title: 'media',
      placeholder: '미디어',
      type: 'text'
    },
    {
      label: '캠페인',
      title: 'campaign',
      placeholder: '캠페인',
      type: 'text'
    },
    {
      label: '전화번호',
      title: 'telNumber',
      placeholder: '전화번호',
      type: 'text'
    },
    {
      label: '상품명(보종)',
      title: 'insuCode',
      placeholder: '상품명(보종)',
      type: 'text'
    },
    {
      label: 'AFCCD',
      title: 'afccd',
      placeholder: 'AFCCD',
      type: 'text'
    },
    {
      label: '유입매체',
      title: 'description',
      placeholder: '유입매체',
      type: 'text'
    },
    {
      label: '모바일기기',
      title: 'mobileYN',
      defaultValue: true,
      type: 'checkbox'
    },
    {
      label: 'defaultYN',
      title: 'defaultYN',
      defaultValue: true,
      type: 'checkbox'
    },
    {
      label: 'doubleYN',
      title: 'doubleYN',
      defaultValue: false,
      type: 'checkbox'
    }    
  ];
  //==============================================================
  const changeYN = (data) => {
    if(data===undefined) return 'N'; 
    if(data===false||data==='false'||data==='N') return 'N';
    if(data===true||data==='true'||data==='Y') return 'Y';
  };
  //==============================================================
  const handleInput = (value, name) => {
    let _value = value;
    if(name==='mobileYN'||name==='defaultYN'||name==='doubleYN') _value=value==='false'||value===''?'true':'false';
    let newObj = {};
    newObj[name] = _value;
    props.setWriteData({
      ...props.writeData,
      ...newObj
    }); 
  };
  //==============================================================
  const handleSubmit = (e, writeData) => {
    e.preventDefault();
    if(!writeData) {enqueueSnackbar(`데이터를 입력 해주세요.`, {variant:'warning'});return;}
    try{
      formData.map(data => {
        if(writeData[data.title]===undefined||writeData[data.title]==='') {
          if(data.title!=='mobileYN'&&data.title!=='defaultYN'&&data.title!=='doubleYN') {
            throw new Error(enqueueSnackbar(`${data.title}를 입력 해주세요.`, {variant:'warning'}));
          }
        }else{
          for (const [key, value] of Object.entries(writeData)) {
            if(key!=='mobileYN'||key!=='defaultYN'||key!=='doubleYN') {
              if(value==='') { 
                let emptyTitle = key;
                throw new Error(enqueueSnackbar(`${emptyTitle}를 입력 해주세요.`, {variant:'warning'}));
              }            
            }
          }        
        }
      });
    }catch(e){
      return;
    }
    writeData['mobileYN'] = changeYN(writeData['mobileYN']);
    writeData['defaultYN'] = changeYN(writeData['defaultYN']);
    writeData['doubleYN'] = changeYN(writeData['doubleYN']);    
    props.putAfccd(writeData);
  };
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
              <h3 className={clsx(props.classes.formTitle)}>AFCCD 등록</h3>
            </Grid>
            {formData.map((data,idx) => {
              if (data.type === 'text') {
                return (
                  <Grid item xs={12}>
                    <h4 className={clsx(props.classes.writeFormTitle)}>{data.label}</h4>                    
                    <TextField 
                      id={idx} 
                      placeholder={data.placeholder}
                      variant="outlined" 
                      fullWidth={true} 
                      InputProps={{
                        classes: {
                          root: clsx(props.classes.writeFormText),
                          input: clsx(props.classes.writeFormInput)
                        }
                      }}
                      value={!props.writeData?'':props.writeData[data['title']]}
                      onChange={(e) => handleInput(e.target.value, data.title)}
                    />              
                  </Grid>                 
                );
              } else if (data.type === 'checkbox') {
                return (
                  <Grid item xs={12}>
                    <h4 className={clsx(props.classes.writeFormTitle)}>{data.label}</h4>
                    <div className={clsx(props.classes.writeFormCheck)}>
                      <div className={clsx(props.classes.writeFormCheckWrap)}>
                        <input 
                          type="checkbox" 
                          id={data.title} 
                          checked={props.writeData[data.title]==='Y'||props.writeData[data.title]==='true' ? true : false}
                          value={!props.writeData?'':props.writeData[data['title']]}
                          name={data.title} 
                          onChange={(e) => handleInput(e.target.value, data.title)}
                        />
                        <label for={data.label}>{data.label}</label>
                      </div>                      
                    </div>
                  </Grid>
                );
              }              
            })}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                className={clsx(props.classes.submitBtn)}
                onClick={(e) => handleSubmit(e, props.writeData)}
              >
                등록
              </Button>              
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                className={clsx(props.classes.submitBtn)}
                onClick={() => props.setOpenForm(false)}
              >
                닫기
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
    textAlign: 'left',
    fontWeight: 'normal'
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
    fontWeight: 'normal'
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
  }  
});
//==============================================================
export default withStyles(styles)(AfccdForm);