import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

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
    return (
      <div>
        {
          customers.map(info => {
            return (
              <Customer 
                key={info.id} // map()은 키 값이 꼭 있어야한다
                id={info.id}
                image={info.image}
                name={info.name}
                birthday={info.birthday}
                gender={info.gender}
                job={info.job}  
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;
