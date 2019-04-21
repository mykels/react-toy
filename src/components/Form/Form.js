import React, {useState} from "react";
import "./Form.css";
import Field from "./Field/Field";

const initialForm = {
    fields: {
        email: {
            value: '',
            touched: false,
            dirty: false,
            valid: false,
            validating: false
        },
        username: {
            value: '',
            touched: false,
            dirty: false,
            validating: false,
            valid: false
        },
        password: {
            value: '',
            touched: false,
            dirty: false,
            validating: false,
            valid: false
        }
    }
};

const Form = () => {
    const [form, setForm] = useState(initialForm);

    const passwordValidator = (password) => {
        if (password.length > 6) {
            return {valid: true};
        }

        return {valid: false, error: 'Password is too short'};
    };

    const onPasswordChange = (event) => {
        const {value} = form.fields.password;
        const newValue = event.target.value;
        const dirty = value !== newValue;
        const {valid, error} = passwordValidator(newValue);
        const password = {...password, dirty, valid, error};
        const newForm = {...form, fields: {...form.fields, password}};
        setForm(newForm);
    };

    const submit = (event) => {
        event.preventDefault();
        // const valid = validateForm();
        // console.log(getData());
    };

    return (
        <form className="form-container" noValidate="novalidate" onSubmit={submit}>
            <Field type="email" id="email" placeholder="Enter email"
                   field={form.fields.email}/>
            <Field type="text" id="username" placeholder="Enter username"
                   field={form.fields.username}/>
            <Field type="password" id="password" autoComplete="new-password"
                   field={form.fields.password}
                   onChange={onPasswordChange}
                   placeholder="Enter password"/>

            <div className='submit-section'>
                <button type="submit" className="btn btn-primary submit-button">
                    Submit
                </button>
            </div>
        </form>
    )
};

export default Form;