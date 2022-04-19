import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/codeHighlighter.css';
import './styles/normalize-fwd.css';
import './styles/index.scss';
import AppRouter from './routers/AppRouter';


ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root')
);
