import React from 'react';
import * as ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";

import './index.css';
import {Provider} from "react-redux";
import reducers from "./TodosApp/state/reducers";
import SignUpForm from "./components/SignUpForm";

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
            <Provider store={store}>
                <SignUpForm/>
            </Provider>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
