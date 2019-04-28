import React, {useState} from "react";
import "./Form.scss";
import Field from "./Field/Field";

const validateAsynchronously = (value, asyncValidator) => {
    return new Promise((resolve, reject) => {

        clearTimeout(asyncValidator.debouncedJob);

        asyncValidator.debouncedJob = setTimeout(() => {
            asyncValidator.validator(value, resolve, reject);
        }, asyncValidator.debounceTime);

    });
};

const buildField = (field) => {
    const {meta} = field;

    field.meta = {
        ...meta,
        touched: false,
        dirty: false,
        valid: false,
        validating: false
    };

    return field;
};

const buildForm = (fields) => {
    return {
        fields: fields.map(buildField),
        meta: {
            valid: false
        }
    };
};

const Form = (props) => {
    const [form, setForm] = useState(buildForm(props.fields));

    const onFieldChange = async (event, field) => {
        const {value} = field.input;
        const {validators, asyncValidator} = field.meta;
        const newValue = event.target.value;
        const dirty = value !== newValue;

        if (dirty) {
            const newField = {...field, input: {...field.input, value: newValue}};
            const newFields = form.fields.map((oldField) => oldField.input.id === field.input.id ? newField : oldField);
            const newForm = {...form, fields: newFields};
            setForm(newForm);
        }

        if (validators) {
            for (const validator of validators) {
                const {valid, error} = validator(newValue);

                if (!valid) {
                    const newField = {
                        ...field,
                        input: {...field.input, value: newValue},
                        meta: {...field.meta, dirty, valid, error}
                    };
                    const newFields = form.fields.map((oldField) => oldField.input.id === field.input.id ? newField : oldField);
                    const newForm = {...form, fields: newFields};
                    setForm(newForm);
                    return;
                }
            }
        }

        if (asyncValidator) {
            let newField = {
                ...field,
                input: {...field.input, value: newValue},
                meta: {...field.meta, dirty, valid: false, loading: true, error: undefined}
            };
            let newFields = form.fields.map((oldField) => oldField.input.id === field.input.id ? newField : oldField);
            let newForm = {...form, fields: newFields};
            setForm(newForm);

            const {valid, error} = await validateAsynchronously(newValue, asyncValidator);

            newField = {
                ...field,
                input: {...field.input, value: newValue},
                meta: {...field.meta, dirty, valid, loading: false, error}
            };
            newFields = form.fields.map((oldField) => oldField.input.id === field.input.id ? newField : oldField);
            newForm = {...form, fields: newFields};
            setForm(newForm);
        }
    };

    const submit = (event) => {
        event.preventDefault();
    };

    return (
        <form className="form-container" noValidate="novalidate" onSubmit={submit}>
            {form.fields.map((field) => (
                <Field key={field.input.id} input={field.input} meta={field.meta}
                       onChange={(event) => onFieldChange(event, field)}/>
            ))}

            <div className='submit-container'>
                <button type="submit" className="btn btn-primary submit-button">
                    Submit
                </button>
            </div>
        </form>
    )
};

export default Form;