import React from 'react';

import './index.css';
import {loadScript} from "../../../utils/scriptLoader/scriptLoader";

loadScript({
    document,
    id: 'google-jssdk',
    src: "//apis.google.com/js/api:client.js"
});

export const GoogleConnectButton = () => {
    const onClick = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: '870325458985-02p24jrpodjroq6ks5d4jknn6den96b6.apps.googleusercontent.com'
            });

            attachSignin(auth2, document.getElementById('googleConnect'));
        });

        console.log("Google button [clicked]");
    };

    const attachSignin = (auth2, element) => {
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                console.log("Signed in with name: ", googleUser.getBasicProfile());
            }, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            });
    };

    return (
        <>
            <a href='#!' className="google-social-button"
               id='googleConnect'
               onClick={onClick}>
                <span className='google-icon'/>
                <p className='google-title'>
                    Continue With Google
                </p>
            </a>
        </>
    );
};