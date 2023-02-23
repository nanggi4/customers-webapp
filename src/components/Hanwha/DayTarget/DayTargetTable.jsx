/* global CryptoJS, logger,  */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../../lib/useStore';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Fade, Popper, Button, Paper, FormGroup, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//==============================================================
// logger.debug(`DayTargetTable::Loaded`);
//==============================================================
const DayTargetTable = (props) => {
  const { utilStore } = useStore();
  const [tableTHData, setTableTHData] = useState([
    /*
    {label: '연', order: 'asc', id: 'year'},
    {label: '월', order: 'asc', id: 'month'},
    {label: '일', order: 'asc', id: 'date'},
    */
    {label: '날짜', order: 'none', id: 'fullDate'},
    {label: '요일', order: 'none', id: 'week'},
    {label: '상담원수', order: 'none', id: 'consultant'},
    {label: '총 DB', order: 'none', id: 'totalCount'},
    {label: '주력 DB', order: 'none', id: 'mainCount'},
    {label: '비주력 DB', order: 'none', id: 'nonMainCount'},
    {label: '한화픽 DB', order: 'none', id: 'pickCount'},
    // {label: '기타 DB', order: 'none', id: 'etcCount'},
    {label: '총 비율', order: 'none', id: 'totalDistribution'},
    {label: '주력 비율', order: 'none', id: 'mainDistribution'},
    {label: '비주력 비율', order: 'none', id: 'nonMainDistribution'},
    {label: '한화픽 비율', order: 'none', id: 'pickDistribution'}
    // {label: '기타 비율', order: 'none', id: 'etcDistribution'}    
  ]);
  const [tableOptionEl, setTableOptionEl] = useState(null);
  const [tableOptionOpen, setTableOptionOpen] = useState(false);
  const [options, setOptions] = useState({
    /*
    year: false,
    month: false,
    date: false,
    */
    fullDate: true,
    week: true,
    consultant: true,
    totalCount: true,
    mainCount: true,
    nonMainCount: true,
    pickCount: true,
    // etcCount: true,    
    totalDistribution: true,
    mainDistribution: true,
    nonMainDistribution: true,
    pickDistribution: true
    // etcDistribution: true    
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
          <Button onClick={() => console.log('export btn !')} variant="outlined" size="small" style={{marginRight: 8}}>월별</Button>
          <Button onClick={() => console.log('export btn !')} variant="outlined" size="small" style={{marginRight: 8}}>요일별</Button>
          <Button onClick={() => console.log('export btn !')} variant="outlined" size="small">주간별</Button>
        </Box>      
        <Box component="div" display="block">
          <Button onClick={handleTableOption()} variant="outlined" size="small">테이블 옵션</Button>
        </Box>
      </Box>
      <Table stickyHeader aria-label='sticky table' size='small' className={props.classes.dataTable}>
        {props.targetList.length>0 && (
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
        {(props.targetList.map((row) => {
          let mainDistribution = Math.round(Number(row.MAIN)/Number(row.TOTAL)*100);
          let nonMainDistribution = Math.round(Number(row.NONMAIN)/Number(row.TOTAL)*100);
          let pickDistribution = Math.round(Number(row.PICK)/Number(row.TOTAL)*100);
          // let etcDistribution = Math.round(Number(row.ETC)/Number(row.TOTAL)*100);
          let totalDistribution = mainDistribution+nonMainDistribution+pickDistribution;
          return (
            <TableRow className={clsx(props.classes.tableTR)} key={row.idx} id={row.idx}>
              {/*
              {options.year&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.YEAR}</TableCell>)}
              {options.month&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.MONTH}</TableCell>)}
              {options.date&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.DATE}</TableCell>)}
              */}
              {options.fullDate&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.fullDate}</TableCell>)}
              {options.week&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'} style={{borderRight: '2px solid #333'}}>{row.week}</TableCell>)}
              {options.consultant&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.consultant}</TableCell>)}
              {options.totalCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.TOTAL}</TableCell>)}
              {options.mainCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.MAIN}</TableCell>)}
              {options.nonMainCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.NONMAIN}</TableCell>)}
              {options.pickCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{row.PICK}</TableCell>)}
              {options.etcCount&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'} style={{borderRight: '2px solid #333'}}>{row.ETC}</TableCell>)}              
              {options.totalDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{totalDistribution}%</TableCell>)}
              {options.mainDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{mainDistribution}%</TableCell>)}
              {options.nonMainDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{nonMainDistribution}%</TableCell>)}
              {options.pickDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{pickDistribution}%</TableCell>)}
              {options.etcDistribution&&(<TableCell className={clsx(props.classes.tableTD)} align={'center'}>{etcDistribution}%</TableCell>)}              
            </TableRow>          
          );
        }))}
        </TableBody>
      </Table>
      <Popper open={tableOptionOpen} anchorEl={tableOptionEl} transition className={props.classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={props.classes.options}>
              <FormGroup row>
                <FormGroup column style={{ marginRight: '0.5rem' }}>
                  {/*
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
                    label="연"
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
                    label="월"
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
                    label="일"
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
                    label="날짜"
                  /> 
                  */}
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
                    label="요일"
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
                    label="상담원수"
                  />              
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.totalCount}
                        onChange={handleOptionChange}
                        name="totalCount"
                        color="primary"
                      />
                    }
                    label="총 DB"
                  />
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
                    label="주력 DB"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mainCount}
                        onChange={handleOptionChange}
                        name="pickCount"
                        color="primary"
                      />
                    }
                    label="한화픽 DB"
                  />
                  {/*
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.mainCount}
                        onChange={handleOptionChange}
                        name="etcCount"
                        color="primary"
                      />
                    }
                    label="기타 DB"
                  />
                  */}
                </FormGroup>
                <FormGroup column>
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
                    label="비주력 DB"
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
                    label="총 비율"
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
                    label="주력 비율"
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
                    label="비주력 비율"
                  />
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.nonMainDistribution}
                        onChange={handleOptionChange}
                        name="pickDistribution"
                        color="primary"
                      />
                    }
                    label="한화픽 비율"
                  />
                  {/*
                  <FormControlLabel
                    className={props.classes.popperLabel}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}                    
                        checked={options.nonMainDistribution}
                        onChange={handleOptionChange}
                        name="etcDistribution"
                        color="primary"
                      />
                    }
                    label="기타 비율"
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
    fontSize: '0.75rem'
  }
});
//==============================================================
export default withStyles(styles,{withTheme:true})(DayTargetTable);