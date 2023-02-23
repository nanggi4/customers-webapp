/* global logger */
import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useStore from '../../../lib/useStore';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import DummyData from './PrevReportListData.json';
//==============================================================
// logger.debug(`PrevReportList::Loaded`);
//==============================================================
const PrevReportList = (props) => {
  const { } = useStore();
  const [tableTHData, setTableTHData] = useState([
    {label: '날짜', order: 'none', id: 'reportDate'},
    {label: '보기', order: 'none', id: 'call'},
    {label: '수정', order: 'none', id: 'update'}
  ]);  
  //==============================================================
  useEffect(() => {
    return () => {};
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Typography component="h4" className={props.classes.title}>보고서 목록</Typography>
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        {DummyData.length>0 && (
          <TableHead className={props.classes.dataTableHead}>
            <TableRow>
              {tableTHData.map((data, index) => {
                return (
                  <TableCell 
                  key={index} 
                  className={clsx(props.classes.tableTH)} 
                  // onClick={(e) => sortData(data.id, data.order)}
                  >
                    <div className={clsx(props.classes.tableTHWrap)}>                
                      {data.label}
                      {data.order!=='none'&&(
                        <React.Fragment>
                          {data.order==='asc'?<ArrowDownwardOutlinedIcon className={props.classes.tableOrderIcon} />:<ArrowUpwardOutlinedIcon className={props.classes.tableOrderIcon} />}
                        </React.Fragment>
                      )}
                    </div>
                  </TableCell>  
                );
              })}
            </TableRow>
          </TableHead>
        )}
        <TableBody className={props.classes.dataTableBody}>
        {DummyData.map((row, idx) => (
          <TableRow className={clsx(props.classes.tableTR)} key={idx} id={idx}>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.reportDate}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
              <Button onClick={() => console.log('call !')} size="small" className={clsx(props.classes.tableBtn)}>보기</Button>
            </TableCell>            
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
              <Button onClick={() => console.log('update !')} size="small" color="secondary" className={clsx(props.classes.tableBtn)}>수정</Button>
            </TableCell>            
          </TableRow>
        ))}
        </TableBody>
      </Table>      
    </React.Fragment>      
  ));
};
//==============================================================
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
  tableBtn: {
    fontSize: '0.75rem',
    width: '100%'
  },
  title: {
    fontSize: '1rem',
    marginBottom: '0.35rem',
    fontWeight: 'bold'
  }  
});
//==============================================================
export default withStyles(styles)(PrevReportList);