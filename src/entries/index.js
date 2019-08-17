import React from 'react';
import * as ReactDOM from "react-dom";
import HookSignUpForm from "../components/SignUpForm/HookSignUpForm";

import './index.css';

const App = () => {
    return (
        <div className="main-content">
            <HookSignUpForm/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
