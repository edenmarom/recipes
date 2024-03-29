import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthContextProvider } from './store/AuthContext';

ReactDOM.render(
  <AuthContextProvider>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);