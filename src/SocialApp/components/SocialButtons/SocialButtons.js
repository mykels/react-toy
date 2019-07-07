import React from 'react';
import {FacebookConnectButton} from "../FacebookConnectButton/FacebookConnectButton";

import './index.css';
import {GoogleConnectButton} from "../GoogleConnectButton/GoogleConnectButton";

export const SocialButtons = () => {

    return (
        <div className="social-buttons">
            <h5>Social Buttons</h5>
            <FacebookConnectButton/>
            <GoogleConnectButton/>
        </div>
    );
};