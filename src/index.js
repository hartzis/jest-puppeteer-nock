import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider, Client, defaultExchanges } from 'urql';

import { BrowserRouter } from 'react-router-dom'

const client = new Client({
  url: 'http://localhost:5544/',
  // url: 'https://czqk28jt.apicdn.sanity.io/v1/graphql/prod_bk/default',
  exchanges: defaultExchanges
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
