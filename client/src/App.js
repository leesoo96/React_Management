import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCeil from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  TableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

/* lifecycle
  1.constructor()
  2.componentWillMount()
  3.render()
  4.componentDidMount()

  props 또는 state가 변경될 경우
  shouldComponentUpdate() -> render()
*/

class App extends Component {
  
 constructor(props){
   super(props);
   this.state = {
     customers : '',
     completed : 0,
     searchKeyword : ''
   }
 }

 // 고객 목록 갱신 - 추가 혹은 삭제할 경우
 stateRefresh = () => {
   this.setState({ // 값 초기화 세팅
    customers : '',
    completed : 0,
    searchKeyword : ''
   });
   this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));  
 }

// 서버에 접근해서 데이터를 가져옴
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));  
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh}
                         key={c.id} id={c.id}
                         name={c.name} birthday={c.birthday}
                         gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const ceilList = ["번호","이미지","이름","생년월일","성별","직업","설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="serarchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>

      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {ceilList.map(c => {
                return <TableCeil className={classes.TableHead}>
                  {c}
                </TableCeil>
              })}
            </TableRow>
          </TableHead>

          <TableBody>          {/* map()은 키 값이 꼭 있어야한다 */}
          {this.state.customers ? 
 /*         this.state.customers.map(info => { return (<Customer stateRefresh={this.stateRefresh}
                                                               key={info.id} 
                                                               id={info.id} 
                                                               image={info.image} 
                                                               name={info.name} 
                                                               birthday={info.birthday} 
                                                               gender={info.gender} 
                                                               job={info.job} />);  */
           filteredComponents(this.state.customers) :                                           
          <TableRow>
            <TableCeil colSpan="6" align="center">
              <CircularProgress className={classes.progress} 
                                variant="determinate" 
                                value={this.state.completed} 
              />
            </TableCeil>
          </TableRow> }
          </TableBody>
        </Table>
      </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(App);
