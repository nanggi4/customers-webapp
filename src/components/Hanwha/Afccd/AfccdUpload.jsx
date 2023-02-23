/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { useSnackbar } from 'notistack';
import AfccdExcelTable from './AfccdExcelTable';
import { Link, Container, Button } from '@material-ui/core';
import {ExcelRenderer} from 'react-excel-renderer';
//==============================================================
// logger.debug(`AfccdUpload::Loaded`);
//==============================================================
const validHead = ['NO.','AFCCD','매체 분류','보종','매체','광고종류','디바이스','유입 매체 (신규 구분자)','전화번호','URL (디바이스 구분)','보종 캠페인','?campaign=','&media=','파라미터 (1)','URL','비고'];
//==============================================================
const AfccdUpload = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [excelHead, setExcelHead] = useState(false);
  const [excelData, setExcelData] = useState(false);
  const [isValid, setIsValid] = useState(false);
  //==============================================================
  const handleFileUpload = (e) => {
    let fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      console.log('err', err);
      if(err){
        enqueueSnackbar(`오류가 발생했습니다.`, {variant:'error'});
        return;
      }else{
        try{
          if(!checkValid(resp.rows.slice(0,1)[0])) throw new Error(enqueueSnackbar('잘못된 데이터 형식입니다.', {variant:'error'}));
          setExcelHead(resp.rows.slice(0,1));
          setExcelData(resp.rows.slice(1));
          enqueueSnackbar(`엑셀데이터를 불러왔습니다.`, {variant:'success'});          
        }catch(e){
          return;
        }
      }
    });               
  };  
  //==============================================================
  const checkValid = (head) => {
    try{
      if(typeof head !== 'object') throw new Error();
      head.forEach((data, idx) => {
        if(data!==validHead[idx]) {
          throw new Error();
        }
      });
      setIsValid(true);
      return true;      
    }catch(e){
      return;
    }
  };
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Container component="main" maxWidth="false" className={clsx(props.classes.container)}>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className={props.classes.input}
          id="upload-excel"
          multiple
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
        <label htmlFor="upload-excel">
          <Button variant="outlined" size="small" component="span" style={{marginRight: 8}}>
            엑셀 업로드
          </Button>
        </label>
        <Button variant="outlined" size="small" color="primary" style={{marginRight: 8}}>
          <Link href="https://s3.ap-northeast-2.amazonaws.com/cdn.datamplan.com/excel_upload+_sample.xlsx" style={{textDecoration: 'none'}}>
            샘플 다운로드
          </Link>          
        </Button>        
        {isValid&&(
          <Button variant="outlined" size="small" color="primary" onClick={() => props.insertExcel(excelData)}>
            데이터 넣기
          </Button>                
        )}
        {(excelHead&&excelData)&&(
          <AfccdExcelTable 
            excelHead={excelHead}
            excelData={excelData}
          />          
        )}          
      </Container>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  container: {
    padding: 0
  },
  input: {
    display: 'none'
  }
});
//==============================================================
export default withStyles(styles)(AfccdUpload);