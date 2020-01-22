import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BrowserHistoryWrapper from './utils/BrowserHistoryWrapper';

import { configureAxios } from './services/axiosInterceptor';

configureAxios();

ReactDOM.render(<BrowserHistoryWrapper>
  <App />
</BrowserHistoryWrapper>
, document.getElementById('root'));
