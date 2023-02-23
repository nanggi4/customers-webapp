/* global logger */
import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Grid, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import AfccdForm from './AfccdForm';
import AfccdTable from './AfccdTable';
import AfccdUpload from './AfccdUpload';
import AfccdSearch from './AfccdSearch';
import AfccdQuery from './AfccdQuery';
//==============================================================
// logger.debug(`Afccd::Loaded`);
//==============================================================
const Afccd = (props) => {
  const { hanwhaStore, connectionStore, commonStore, cookieStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const [afccdCount, setAfccdCount] = useState(!cookieStore.afccdCount?false:cookieStore.afccdCount);
  const [afccdList, setAfccdList] = useState(!cookieStore.afccd?false:toJS(cookieStore.afccd));
  const [writeData, setWriteData] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openInsertQuery, setOpenInsertQuery] = useState(false);
  const [tabValue, setTabValue] = useState('list');
  const [limitValue, setLimitValue] = useState(300);
  const [pageValue, setPageValue] = useState(1);
  const [searchOption, setSearchOption] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchValue, setSearchValue] = useState({afccd:'',campaign:''});
  const [insertQueryDate, setInsertQueryDate] = useState(false);
  const [insertQuery, setInsertQuery] = useState(false);
  const [copyQuery, setCopyQuery] = useState(false);
  //==============================================================
  const handleUpdateBtn = (data) => {
    if(!openForm) setOpenForm(true);
    setWriteData(data);
  };
  //==============================================================
  const getInsertQuery = () => {
    let query = `query`;
    const regex = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/);
    if(!regex.test(insertQueryDate)){
      enqueueSnackbar(`잘못된 형식입니다.`, {variant:'error'});
    }else{
      afccdList.forEach(data => {
        const regDate = data.regDate.slice(0,10).split("-").join("");
        const ChangeRegDate = data.regDate.slice(0,10)+" "+data.regDate.slice(11,19);
        const ChangeUpdateDate = data.regDate.slice(0,10)+" "+data.regDate.slice(11,19);
        if(regDate >= insertQueryDate){
          query += `('${data.media}', '${data.campaign}', '${data.telNumber}', '${data.insuCode}', '${data.afccd}', '${data.mobileYN}', '${data.defaultYN}', '${data.doubleYN}', '${data.description}', '${ChangeRegDate}', '${ChangeUpdateDate}'),`;
        } 
      });
      query = query.slice(0,-1);
      setInsertQuery(query);
      setTabValue('query');
    }
    setInsertQueryDate("");
  };
  //==============================================================
  const handleOpenForm = () => {
    if(!openForm) setOpenForm(true);
    if(openForm&&!writeData) setOpenForm(false);
    if(writeData) setWriteData(false);
  };  
  //==============================================================
  const exportAfccdCsv = () => {
    hanwhaStore.exportAfccdCsv({
      connectionStore,
      data: {
        searchValue
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const _result = _payload.isSuccess.fileInfo;
          setDownloadUrl(_result.preSignedURL);
        }
        commonStore.setStoreValue('loading', false);
      }
    });    
  };
  //==============================================================
  const getAfccdList = () => {
    if(downloadUrl) setDownloadUrl(false);
    if(tabValue!=='list') setTabValue('list');
    //==============================================================
    cookieStore.setStoreValue('afccdLimit', limitValue);
    cookieStore.setStoreValue('afccdPage', pageValue);    
    //==============================================================
    hanwhaStore.getAfccdList({
      connectionStore,
      data: {
        pageValue,
        limitValue,
        searchValue
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const _result = _payload.isSuccess.sqlQueryResult;
          if(_result.listQueryResult.length===0) {
            setIsEmpty(true);
          }else{
            setAfccdList(_result.listQueryResult);
            cookieStore.setStoreValue('afccd', _result.listQueryResult);
            setIsEmpty(false);
          }
          setAfccdCount(_result.countQueryResult[0]['COUNT(*)']);
          cookieStore.setStoreValue('afccdCount', _result.countQueryResult[0]['COUNT(*)']);
        }
        commonStore.setStoreValue('loading', false);
      }
    });      
  };
  //==============================================================
  const putAfccd = (data) => {
    hanwhaStore.putAfccd({
      connectionStore,
      data: {
        'put-afccd': data
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const _result = _payload.isSuccess.sqlQueryResult;
          if(_result.queryResult.affectedRows>0) {
            enqueueSnackbar(`정상적으로 처리 되었습니다.`, {variant:'success'});
            if(_result.query!==undefined) setCopyQuery(_result.query);
            setTabValue('list');
            getAfccdList();
          }else{
            commonStore.setStoreValue('loading', false);
            enqueueSnackbar(`오류가 발생 했습니다.`, {variant:'error'});
          }
        }
      }
    });
  };
  //==============================================================
  const insertExcel = (excelData) => {
    hanwhaStore.insertExcel({
      connectionStore,
      data: {
        'put-excel': {excelData}
      },
      callback:(_payload)=>{
        if(_payload.isSuccess){
          const _result = _payload.isSuccess.sqlQueryResult.queryResult;
          if(_result.affectedRows>0) {
            getAfccdList();
            enqueueSnackbar(`정상적으로 처리 되었습니다.`, {variant:'success'});
          }else{
            commonStore.setStoreValue('loading', false);
            enqueueSnackbar(`오류가 발생 했습니다.`, {variant:'error'});
          }
        }
      }
    });    
  };  
  //==============================================================
  useEffect(() => {
    if(
      !afccdList||
      limitValue!==cookieStore.afccdLimit||
      pageValue!==cookieStore.afccdPage
    ) getAfccdList();
  }, [limitValue, pageValue]);  
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} className={clsx(props.classes.btnWrap)}>
          <React.Fragment>
            <Button onClick={() => setTabValue('list')} variant="outlined" size="small" style={{marginRight: 8}}>AFCCD 목록</Button>
            <Button onClick={() => setTabValue('upload')} variant="outlined" size="small" style={{marginRight: 8}}>AFCCD 엑셀 업로드</Button>
            {afccdList&&(
              <Button onClick={() => setOpenInsertQuery(!openInsertQuery)} variant="outlined" size="small">INSERT 쿼리 만들기</Button>
            )}          
            {openInsertQuery&&(
              <React.Fragment>
                <input
                  type="text"
                  placeholder="생성날짜 (이후시점)"
                  onChange={(e) => setInsertQueryDate(e.target.value)}
                  className={clsx(props.classes.input)}
                />  
                <Button 
                  onClick={(e) => getInsertQuery()} 
                  variant="outlined" 
                  size="small"
                >
                  생성
                </Button>                
              </React.Fragment>
            )}
          </React.Fragment>
        </Grid>
        {tabValue==='list'&&(
          <React.Fragment>
            {copyQuery&&(
              <Grid item xs={12} className={clsx(props.classes.copyQueryWrap)}>
                <b>아래 내용을 복사해서 개발팀에게 전달해주세요 ! 😍</b>
                <br />
                {copyQuery}
              </Grid>
            )}
            {searchOption&&(
              <Grid item xs={12} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
                <AfccdSearch
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  getAfccdList={getAfccdList}
                />
              </Grid>
            )}
            {!isEmpty?(
              <React.Fragment>
                {(afccdList&&afccdCount)&&(
                  <Grid item xs={openForm?9:12}>
                    <AfccdTable
                      afccdCount={afccdCount}
                      afccdList={afccdList}
                      handleOpenForm={handleOpenForm}
                      handleUpdateBtn={handleUpdateBtn}
                      limitValue={limitValue}
                      setLimitValue={setLimitValue}
                      pageValue={pageValue}
                      setPageValue={setPageValue}
                      getAfccdList={getAfccdList}
                      searchOption={searchOption}
                      setSearchOption={setSearchOption}
                      exportAfccdCsv={exportAfccdCsv}
                      downloadUrl={downloadUrl}
                    />
                  </Grid>
                )}            
              </React.Fragment>
            ):(
              <Grid item xs={openForm?9:12}>
                <h1 style={{textAlign:'center', margin:'3rem 0 0'}}>검색결과가 없습니다. 😥</h1>
              </Grid>
            )}
            {openForm&&(
              <Grid item xs={3}>
                <AfccdForm 
                  putAfccd={putAfccd}
                  writeData={writeData}
                  setWriteData={setWriteData}
                  setOpenForm={setOpenForm}
                />
              </Grid>                
            )}
          </React.Fragment>
        )}
        {tabValue==='upload'&&(
          <Grid item xs={12}>
            <AfccdUpload 
              insertExcel={insertExcel}
            />
          </Grid>
        )}
        {tabValue==='query'&&(
          <Grid item xs={12}>
            <AfccdQuery
              insertQuery={insertQuery}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>      
  ));
};
//==============================================================
const styles = theme => ({
  btnWrap: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    margin: '0 8px',
    padding: '0 8px',
    height: '27.5px',
    fontFamily: 'Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Helvetica",Arial,"Noto Sans KR",sans-serif'    
  },
  copyQueryWrap: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)' 
  }
});
//==============================================================
export default withStyles(styles)(Afccd);