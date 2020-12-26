import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theem = createMuiTheme({
  typography: {
    fontFamily: '"Noto sans KR", serif', 
  }
})

ReactDOM.render(
  <MuiThemeProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
