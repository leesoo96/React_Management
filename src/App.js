import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCeil from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX: "atuo"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id': 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name' : '홍시영',
    'birthday' : '910124',
    'gender' : '남자',
    'job' : '프로듀서'
  },
  {
    'id': 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name' : '민경훈',
    'birthday' : '841006',
    'gender' : '남자',
    'job' : '가수'
  },
  {
    'id': 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name' : '김남길',
    'birthday' : '800313',
    'gender' : '남자',
    'job' : '배우'
  }
]

class App extends Component {
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
          {customers.map(info => { return (<Customer key={info.id} id={info.id} image={info.image} name={info.name} birthday={info.birthday} gender={info.gender} job={info.job}/>); })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
