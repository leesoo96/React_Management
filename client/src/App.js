import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCeil from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX: "atuo"
  },
  table: {
    minWidth: 1080
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
  
  state = {
    customers: "",
    completed: 0
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

  render(){
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCeil>번호</TableCeil>
              <TableCeil>이미지</TableCeil>
              <TableCeil>이름</TableCeil>
              <TableCeil>생년월일</TableCeil>
              <TableCeil>성별</TableCeil>
              <TableCeil>직업</TableCeil>
            </TableRow>
          </TableHead>

          <TableBody>          {/* map()은 키 값이 꼭 있어야한다 */}
          {this.state.customers ? 
          this.state.customers.map(info => { return (<Customer key={info.id} 
                                                               id={info.id} 
                                                               image={info.image} 
                                                               name={info.name} 
                                                               birthday={info.birthday} 
                                                               gender={info.gender} 
                                                               job={info.job}/>); 
          }) : 
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
    );
  }
}

export default withStyles(styles)(App);
