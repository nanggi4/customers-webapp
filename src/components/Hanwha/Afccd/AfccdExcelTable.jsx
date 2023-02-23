/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Box } from '@material-ui/core';
//==============================================================
// logger.debug(`AfccdExcelTable::Loaded`);
//==============================================================
const AfccdExcelTable = (props) => {
  const { } = useStore();
  //==============================================================
  // componentDidMount
  useEffect(() => {
    return () => { // componentWillunmount
    };
  }, []);
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <Box className={props.classes.tableWrap} component="div" display="block">
        <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
          {props.excelHead.length>0 && (
            <TableHead className={props.classes.dataTableHead}>
              <TableRow>
                {props.excelHead[0].map((data, idx) => (
                  <TableCell 
                  key={idx} 
                  className={clsx(props.classes.tableTH)} 
                  >
                    <div className={clsx(props.classes.tableTHWrap)}>                
                      {data}
                    </div>
                  </TableCell>                 
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody className={props.classes.dataTableBody}>
          {(props.excelData.map((row, idx) => (
            <TableRow className={clsx(props.classes.tableTR)} key={idx} id={idx}>
              {row.map(data => (
                <TableCell className={clsx(props.classes.tableTD)} align={'center'}>{data}</TableCell>
              ))}
            </TableRow>
          )))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  ));
};
//==============================================================
const styles = theme => ({
  tableWrap: {
    width: '100%',
    overflowX: 'scroll'
  },
  dataTable: {
    marginTop: '0.5rem'
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
  }
});
//==============================================================
export default withStyles(styles,{withTheme:true})(AfccdExcelTable);