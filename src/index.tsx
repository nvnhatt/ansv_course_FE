import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <SWRConfig value={{
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }}>
      <App />
    </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
