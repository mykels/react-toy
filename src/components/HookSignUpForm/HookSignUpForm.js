import React from "react";
import Field from "./Field/Field";
import {Form} from "./Form";
import {SignUpValidator} from "./validator";
import useForm from "../../utils/hooks/useForm";

import "./index.css";

const signUpValidator = new SignUpValidator();

const HookSignUpForm = () => {
    const onSubmit = (fields) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setFieldErrors({
                    email: fields.email.value.includes("micha") ? ['Email already exists'] : [],
                    username: fields.username.value.includes("micha") ? ['Username is not allowed'] : [],
                    password: fields.password.value.includes("123") ? ['Password is not allowed'] : []
                });
                resolve();
            }, 1500);
        })
    };

    const {
        meta,
        fields,
        onFieldChange,
        setFieldErrors,
        onSubmission
    } = useForm(onSubmit, ["email", "username", "password"], signUpValidator);

    return (
        <Form submitText='Continue' onSubmit={onSubmission} {...meta}>
            <Field type='email' id='email' name='email' placeholder='Enter Email..'
                   {...fields.email}
                   onChange={onFieldChange}/>
            <Field type='text' id='username' name='username' placeholder='Enter Username..'
                   {...fields.username}
                   onChange={onFieldChange}/>
            <Field type='password' id='password' name='password' placeholder='Enter Password..'
                   {...fields.password}
                   onChange={onFieldChange}/>
        </Form>
    );
};

export default HookSignUpForm;