import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
