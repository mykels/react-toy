import React from "react";
import Field from "../Field";
import withValidatedForm from "../../utils/hoc/withValidatedForm";
import {fieldsDef, submissionTitle, submissionUrl, validator} from "./constants";

import "./style.css";

const SignUpForm = ({fields, onFieldChange}) => (
    <>
        <Field type='email' id='email' name='email' placeholder='Enter Email..'
               {...fields.email}
               onChange={onFieldChange}/>
        <Field type='text' id='username' name='username' placeholder='Enter Username..'
               {...fields.username}
               onChange={onFieldChange}/>
        <Field type='password' id='password' name='password' placeholder='Enter Password..'
               {...fields.password}
               onChange={onFieldChange}/>
    </>
);

export default withValidatedForm(
    SignUpForm,
    {
        submissionTitle,
        submissionUrl,
        fieldsDef,
        validator
    }
);