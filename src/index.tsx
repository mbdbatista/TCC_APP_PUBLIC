import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes'
import { ToastContainer } from 'react-toastify'
import './index.scss'
ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}      
      newestOnTop={false}
      draggable={false}
    />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);