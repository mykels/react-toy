import React from "react";
import Field from "./Field/Field";
import useForm from "./hooks/useForm";
import fieldValues from "./fields/fields";
import {Form} from "./Form";

const HookSignUpForm = () => {
    const onSubmit = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setErrors({
                    password: 'Password already exists'
                });
                resolve();
            }, 1500);
        })
    };

    const {
        meta,
        fields,
        onFieldChange,
        setErrors,
        onSubmission
    } = useForm(onSubmit, fieldValues);

    return (
        <Form submitText='Continue' meta={meta} onSubmit={onSubmission}>
            <Field type='email' id='email' name='email' placeholder='Enter Email..'
                   value={fields.email.value} meta={fields.email.meta}
                   disabled={meta.submitting}
                   onChange={onFieldChange}/>
            <Field type='text' id='username' name='username' placeholder='Enter Username..'
                   value={fields.username.value} meta={fields.username.meta}
                   disabled={meta.submitting}
                   onChange={onFieldChange}/>
            <Field type='password' id='password' name='password' placeholder='Enter Password..'
                   value={fields.password.value} meta={fields.password.meta}
                   disabled={meta.submitting}
                   onChange={onFieldChange}/>
        </Form>
    );
};

export default HookSignUpForm;