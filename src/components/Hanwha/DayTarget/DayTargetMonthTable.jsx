/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
//==============================================================
// logger.debug(`DayTargetMonthTable::Loaded`);
//==============================================================
const DayTargetMonthTable = (props) => {
  const { utilStore } = useStore();
  const [tableTHData, setTableTHData] = useState([
    {label: '연', order: 'none', id: 'year'},
    {label: '월', order: 'none', id: 'month'},
    {label: '목표 DB', order: 'none', id: 'targetCount'},
    {label: '주력', order: 'none', id: 'mainTarget'},
    {label: '비주력', order: 'none', id: 'nonMainTarget'},
    {label: '한화픽', order: 'none', id: 'pickTarget'},
    {label: '수정', order: 'none', id: 'update'}
  ]);
  //==============================================================
  const sortData = (id, order) => {
    utilStore.sortData(id, order);
    setTableTHData((tableTHData) =>
      tableTHData.map((data) => {
        return data.id === id ? { ...data, order: (order === 'asc') ? 'desc' : 'asc' } : data;
      }),
    );    
  };
  //==============================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Typography component="h4" className={props.classes.tableTitle}>월간목표</Typography>
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        {props.monthTargetList.length>0 && (
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
        {(props.monthTargetList.map((row) => (
          <TableRow className={clsx(props.classes.tableTR)} key={row.idx} id={row.idx}>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.YEAR}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.MONTH}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.targetCount}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.mainTarget}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.nonMainTarget}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.pickTarget}</TableCell>
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
              <Button onClick={() => props.handleUpdateMonthTarget(row)} size="small" color="secondary" className={clsx(props.classes.tableBtn)}>수정</Button>
            </TableCell>            
          </TableRow>
        )))}
        </TableBody>
      </Table>
    </React.Fragment>
  ));
};
//===============================================================
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
  tableTitle: {
    fontSize: '1rem',
    marginBottom: '0.35rem',
    fontWeight: 'bold'
  }  
});
//===============================================================
export default withStyles(styles,{withTheme:true})(DayTargetMonthTable);