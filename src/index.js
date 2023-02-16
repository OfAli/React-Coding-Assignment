import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import store from "../src/Redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);