/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//==============================================================
// logger.debug(`DayTargetDayTable::Loaded`);
//==============================================================
const DayTargetDayTable = (props) => {
  const { utilStore } = useStore();
  const [tableTHData, setTableTHData] = useState([
    // {label: '연', order: 'asc', id: 'year'},
    // {label: '월', order: 'asc', id: 'month'},
    // {label: '일', order: 'asc', id: 'date'},
    {label: '날짜', order: 'none', id: 'fullDate'},
    {label: '요일', order: 'none', id: 'week'},
    {label: '상담원수', order: 'none', id: 'consultant'},
    {label: '주력', order: 'none', id: 'mainTarget'},
    {label: '비주력', order: 'none', id: 'nonMainTarget'},
    {label: '한화픽', order: 'none', id: 'pickTarget'},
    // {label: '주력 비율', order: 'asc', id: 'mainDistribution'},
    // {label: '비주력 비율', order: 'asc', id: 'nonMainDistribution'},
    // {label: '한화픽 비율', order: 'asc', id: 'pickDistribution'},
    {label: '수정', order: 'none', id: 'update'}
  ]);
  const [tableOptionEl, setTableOptionEl] = useState(null);
  const [tableOptionOpen, setTableOptionOpen] = useState(false);
  const [options, setOptions] = useState({
    // year: false,
    // month: false,
    // date: false,
    fullDate: true,
    week: true,
    consultant: true,
    mainTarget: true,
    nonMainTarget: true,
    pickTarget: true,
    // nonMainDistribution: true,
    // pickDistribution: true,
    update: true
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
      <Typography component="h4" className={props.classes.tableTitle}>일일목표</Typography>    
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        {props.dayTargetList.length>0 && (
          <TableHead className={props.classes.dataTableHead}>
            <TableRow>
              {tableTHData.map((data, index) => {
                return (
                  <React.Fragment>
                    {options[data.id]&&(
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
                    )}
                  </React.Fragment>
                );
              })}
            </TableRow>
          </TableHead>
        )}
        <TableBody className={props.classes.dataTableBody}>
        {(props.dayTargetList.map((row) => (
          <TableRow className={clsx(props.classes.tableTR)} key={row.idx} id={row.idx}>
            {options.year&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.YEAR}</TableCell>)}
            {options.month&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.MONTH}</TableCell>)}
            {options.date&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.DATE}</TableCell>)}
            {options.fullDate&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.fullDate}</TableCell>)}
            {options.week&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.WEEK}</TableCell>)}
            {options.consultant&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.consultant}</TableCell>)}
            {/*options.totalCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.totalCount}</TableCell>)*/}
            {options.mainTarget&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.mainTarget}</TableCell>)}
            {options.nonMainTarget&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.nonMainTarget}</TableCell>)}
            {options.pickTarget&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.pickTarget}</TableCell>)}
            {/*options.mainDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.mainDistribution}</TableCell>)*/}
            {/*options.nonMainDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.nonMainDistribution}</TableCell>)*/}
            {/*options.pickDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.pickDistribution}</TableCell>)*/}
            <TableCell className={clsx(props.classes.tableTD)} align={'center'}>
              <Button onClick={() => props.handleUpdateDayTarget(row)} size="small" color="secondary" className={clsx(props.classes.tableBtn)}>수정</Button>
            </TableCell>            
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
                        checked={options.year}
                        onChange={handleOptionChange}
                        name="year"
                        color="primary"
                      />
                    }
                    label="year"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.month}
                        onChange={handleOptionChange}
                        name="month"
                        color="primary"
                      />
                    }
                    label="month"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.date}
                        onChange={handleOptionChange}
                        name="date"
                        color="primary"
                      />
                    }
                    label="date"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.fullDate}
                        onChange={handleOptionChange}
                        name="fullDate"
                        color="primary"
                      />
                    }
                    label="fullDate"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.week}
                        onChange={handleOptionChange}
                        name="week"
                        color="primary"
                      />
                    }
                    label="week"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.consultant}
                        onChange={handleOptionChange}
                        name="consultant"
                        color="primary"
                      />
                    }
                    label="consultant"
                  />                    
                </FormGroup>
                <FormGroup column>
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mainCount}
                        onChange={handleOptionChange}
                        name="mainCount"
                        color="primary"
                      />
                    }
                    label="mainCount"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.nonMainCount}
                        onChange={handleOptionChange}
                        name="nonMainCount"
                        color="primary"
                      />
                    }
                    label="nonMainCount"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.totalDistribution}
                        onChange={handleOptionChange}
                        name="totalDistribution"
                        color="primary"
                      />
                    }
                    label="totalDistribution"
                  /> 
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mainDistribution}
                        onChange={handleOptionChange}
                        name="mainDistribution"
                        color="primary"
                      />
                    }
                    label="mainDistribution"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.nonMainDistribution}
                        onChange={handleOptionChange}
                        name="nonMainDistribution"
                        color="primary"
                      />
                    }
                    label="nonMainDistribution"
                  />
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
//===================================================================
export default withStyles(styles,{withTheme:true})(DayTargetDayTable);