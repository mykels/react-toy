import React from 'react';
import './index.css';
import {loadScript} from "../../../utils/scriptLoader/scriptLoader";

loadScript({
    document,
    id: 'facebook-jssdk',
    src: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=400683740752601'
});

const LOGIN_OPTIONS = {
    scope: 'email, user_birthday, user_likes'
};

export const FacebookConnectButton = () => {

    const onClick = () => {
        console.log("Facebook button [clicked]");

        window.FB.login(onLogin, LOGIN_OPTIONS);
    };

    const onLogin = (response) => {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            const access_token = response.authResponse.accessToken; //get access token
            const user_id = response.authResponse.userID; //get FB UID
            console.log("access_token", access_token);
            console.log("user_id", user_id);


            window.FB.api('/me', function (response) {
                const user_email = response.email; //get user email

                // you can store this data into your database
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    };

    return (
        <a href='#!' className="facebook-social-button"
           onClick={onClick}>
            <span className='facebook-icon'/>
            <p className='facebook-title'>
                Continue With Facebook
            </p>
        </a>
    );
};