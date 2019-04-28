import React from 'react';
import * as ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from "./state/reducers";
import thunk from "redux-thunk";
import './index.css';
import HookSignUpForm from "./components/HookSignUpForm/HookSignUpForm";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(reducers, enhancer);

const App = () => {
    return (
        <div className="main-content">
            <HookSignUpForm/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
