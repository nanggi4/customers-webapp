/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Link, Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem } from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Pagination from '@material-ui/lab/Pagination';
//==============================================================
// logger.debug(`AffcdTable::Loaded`);
//==============================================================
const limitValueList = [500, 300, 100, 50, 30, 10];
//==============================================================
const AffcdTable = (props) => {
  const { utilStore } = useStore();
  const [tableTHData, setTableTHData] = useState([
    {label: 'idx', order: 'asc', id: 'idx'},
    {label: '미디어', order: 'asc', id: 'media'},
    {label: '캠페인', order: 'asc', id: 'campaign'},
    {label: '전화번호', order: 'asc', id: 'telNumber'},
    {label: '상품명(보종)', order: 'asc', id: 'insuCode'},
    {label: 'AFCCD', order: 'asc', id: 'afccd'},
    {label: '모바일기기', order: 'asc', id: 'mobileYN'},
    {label: 'defaultYN', order: 'asc', id: 'defaultYN'},
    {label: 'doubleYN', order: 'asc', id: 'doubleYN'},
    {label: '유입매체', order: 'asc', id: 'description'},
    {label: '등록날짜', order: 'asc', id: 'regDate'},
    {label: '수정날짜', order: 'asc', id: 'updateDate'},
    {label: '수정', order: 'none', id: 'update'},
    {label: '삭제', order: 'none', id: 'delete'}
  ]);
  const [tableOptionEl, setTableOptionEl] = useState(null);
  const [tableOptionOpen, setTableOptionOpen] = useState(false);
  const [options, setOptions] = useState({
    idx: false,
    media: true,
    campaign: true,
    telNumber: true,
    insuCode: true,
    afccd: true,
    mobileYN: true,
    defaultYN: false,
    doubleYN: false,
    termcode: true,
    description: true,
    regDate: true,
    updateDate: false,
    update: true
    // delete: true
  });
  //==================================================================
  const handleOptionChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };
  //==================================================================
  const handleTableOption = () => (event) => {
    setTableOptionEl(event.currentTarget);
    setTableOptionOpen(!tableOptionOpen);
  };   
  const sortData = (id, order) => {
    utilStore.sortData(id, order);
    setTableTHData((tableTHData) =>
      tableTHData.map((data) => {
        return data.id === id ? { ...data, order: (order === 'asc') ? 'desc' : 'asc' } : data;
      }),
    );    
  };
  //==================================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //==================================================================
  return useObserver(() => (
    <React.Fragment>
      <Box className={props.classes.dataOptionWrap} component="div" display="flex">
        <Box component="div" display="block">
          <Button onClick={() => props.handleOpenForm()} variant="outlined" size="small" style={{marginRight: 8}}>AFCCD 생성</Button>
          <Button onClick={() => props.exportAfccdCsv()} variant="outlined" size="small" style={{marginRight: 8}}>AFCCD 추출</Button>
          {props.downloadUrl&&(
            <Button variant="outlined" size="small" color="primary">
              <Link href={props.downloadUrl} style={{textDecoration: 'none'}}>
                다운받기
              </Link>          
            </Button>          
          )}
        </Box>      
        <Box component="div" display="flex" className={props.classes.dataOptionWrapRight}>
          <span className={clsx(props.classes.titleTitle)}>총 {props.afccdCount}건</span>
          <Pagination count={Math.ceil(props.afccdCount/props.limitValue)} size="small" onChange={(e, page) => props.setPageValue(page)} className={props.classes.pagingListContainer} />
          <TextField
            id='input-limit'
            variant='outlined' color='secondary' size='small' select
            label={'건수'}
            value={props.limitValue}
            className={props.classes.limitSelectBox}
            onChange={(e)=>props.setLimitValue(e.target.value)}
            SelectProps={{
              SelectDisplayProps: {style: {width: 40, paddingTop: 7, paddingBottom: 4}}
            }}
            InputProps={{
              classes: { root: props.classes.limitInput }
            }}                                
          >
            {limitValueList.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>          
          <Button onClick={handleTableOption()} variant="outlined" size="small" style={{marginLeft: '0.5rem'}}>테이블 옵션</Button>
          <Button onClick={() => props.setSearchOption(!props.searchOption)} variant="outlined" size="small" style={{marginLeft: '0.5rem'}}>검색 옵션</Button>
        </Box>
      </Box>
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        {props.afccdList.length>0 && (
          <TableHead className={props.classes.dataTableHead}>
            <TableRow>
              {tableTHData.map((data, index) => {
                return (
                  <React.Fragment>
                    {options[data.id]&&(
                      <TableCell 
                      key={index} 
                      className={clsx(props.classes.tableTH)} 
                      onClick={(e) => sortData(data.id, data.order)}>
                        <div className={clsx(props.classes.tableTHWrap)}>                
                          {data.label}
                          {data.order!=='none'&&(
                            <React.Fragment>
                              {data.order==='asc'?<ArrowDownwardOutlinedIcon className={props.classes.tableOrderIcon} />:<ArrowUpwardOutlinedIcon className={props.classes.tableOrderIcon} />}
                            </React.Fragment>
                          )}
                        </div>
                      </TableCell>                
                    )}
                  </React.Fragment>
                );
              })}
            </TableRow>
          </TableHead>
        )}
        <TableBody className={props.classes.dataTableBody}>
        {(props.afccdList.map((row) => (
          <TableRow className={clsx(props.classes.tableTR)} key={row.idx} id={row.idx}>
            {options.idx&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.idx}</TableCell>)}
            {options.media&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.media}</TableCell>)}
            {options.campaign&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.campaign}</TableCell>)}
            {options.telNumber&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.telNumber}</TableCell>)}
            {options.insuCode&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.insuCode}</TableCell>)}
            {options.afccd&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.afccd}</TableCell>)}
            {options.mobileYN&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.mobileYN}</TableCell>)}
            {options.defaultYN&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.defaultYN}</TableCell>)}
            {options.doubleYN&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.doubleYN}</TableCell>)}
            {options.description&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.description}</TableCell>)}
            {options.regDate&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{utilStore.convertTimestamp(row.regDate)}</TableCell>)}
            {options.updateDate&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{utilStore.convertTimestamp(row.updateDate)}</TableCell>)}
            {options.update&&(
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
                <Button onClick={() => props.handleUpdateBtn(row)} size="small" color="secondary" className={clsx(props.classes.tableBtn)}>수정</Button>
              </TableCell>
            )}
            {/*options.delete&&(
              <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
                <Button onClick={() => console.log(`delete btn ${row.idx}!`)} variant="contained" size="small" color="primary" className={clsx(props.classes.tableBtn)}>delete</Button>
              </TableCell>
            )*/}
          </TableRow>
        )))}
        </TableBody>
      </Table>
      <Popper open={tableOptionOpen} anchorEl={tableOptionEl} transition className={props.classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={props.classes.options}>
              <FormGroup row>
                <FormGroup column style={{ marginRight: '0.5rem' }}>
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.idx}
                        onChange={handleOptionChange}
                        name="idx"
                        color="primary"
                      />
                    }
                    label="idx"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.media}
                        onChange={handleOptionChange}
                        name="media"
                        color="primary"
                      />
                    }
                    label="미디어"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.campaign}
                        onChange={handleOptionChange}
                        name="campaign"
                        color="primary"
                      />
                    }
                    label="캠페인"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.telNumber}
                        onChange={handleOptionChange}
                        name="telNumber"
                        color="primary"
                      />
                    }
                    label="전화번호"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.insuCode}
                        onChange={handleOptionChange}
                        name="insuCode"
                        color="primary"
                      />
                    }
                    label="상품명(보종)"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.afccd}
                        onChange={handleOptionChange}
                        name="afccd"
                        color="primary"
                      />
                    }
                    label="AFCCD"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mobileYN}
                        onChange={handleOptionChange}
                        name="mobileYN"
                        color="primary"
                      />
                    }
                    label="모바일기기"
                  />                    
                </FormGroup>
                <FormGroup column>
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.defaultYN}
                        onChange={handleOptionChange}
                        name="defaultYN"
                        color="primary"
                      />
                    }
                    label="defaultYN"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.doubleYN}
                        onChange={handleOptionChange}
                        name="doubleYN"
                        color="primary"
                      />
                    }
                    label="doubleYN"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.description}
                        onChange={handleOptionChange}
                        name="description"
                        color="primary"
                      />
                    }
                    label="유입매체"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.regDate}
                        onChange={handleOptionChange}
                        name="regDate"
                        color="primary"
                      />
                    }
                    label="등록날짜"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.updateDate}
                        onChange={handleOptionChange}
                        name="updateDate"
                        color="primary"
                      />
                    }
                    label="수정날짜"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.update}
                        onChange={handleOptionChange}
                        name="update"
                        color="primary"
                      />
                    }
                    label="수정"
                  />
                  {/*
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.delete}
                        onChange={handleOptionChange}
                        name="delete"
                        color="primary"
                      />
                    }
                    label="delete"
                  /> 
                  */}
                </FormGroup>
              </FormGroup>
            </Paper>
          </Fade>
        )}
      </Popper>      
    </React.Fragment>
  ));
};
//===================================================================
const styles = theme => ({
  dataTable: {
  },
  dataTableHead: {
  },
  dataTableBody: {
    borderLeft: '1px solid #eee',
  },
  tableTR: {
    '&:hover':{
      backgroundColor: '#eee',
    },
    '&:hover td':{
      color: 'rgba(0, 0, 0, 0.87)',
    }
  },
  tableTH: {
    padding: '3px 6px',
    borderRight: '1px solid #dedede',
    backgroundColor: '#eaeaea',
    cursor: 'pointer',
    color: '#000',
    textAlign: 'center',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_LG)]: {
    },
    fontSize: '0.9rem'
  },
  tableTHWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableOrderIcon: {
    marginLeft: theme.spacing(0.25),
    padding: 4
  },
  tableTD: {
    textOverflow:'ellipsis',
    overflow:'hidden',
    whiteSpace:'nowrap',
    padding: '3px 5px 3px!important',
    borderRight: '1px solid #eee',
    lineHeight: '1.1em',
    letterSpacing: -1,
    '&:hover':{
      overflow: 'visible !important',
      textOverflow:'ellipsis',
    },
    fontSize: '0.9rem',
  },
  safeTextColor: {
    color: '#f9f9f9',
  },
  popper: {
    zIndex: 1000
  },
  options: {
    padding: theme.spacing(0, 1.5),
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
  },
  popperLabel: {
    marginRight: 0
  },
  dataOptionWrap: {
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  tableBtn: {
    fontSize: '0.75rem',
    width: '100%',
    fontWeight: 'bold'
  },
  titleTitle: {
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    transform: 'skew(-0.05deg)',
    fontWeight: 500
  },
  dataOptionWrapRight: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagingListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
    [theme.breakpoints.down(process.env.CONST_THEME_BREAKPOINT_XS)]: {
      margin: 0
    }    
  }  
});
//===================================================================
export default withStyles(styles,{withTheme:true})(AffcdTable);