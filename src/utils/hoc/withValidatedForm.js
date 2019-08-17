import React, {PureComponent} from "react";
import Form from "../../components/Form";

const activeValidations = {};

const enrichFields = (fieldsDef) => {
    const fields = {};

    fieldsDef.forEach((name) => {
        fields[name] = {
            name,
            value: '',
            dirty: false,
            valid: true,
            loading: false
        };
    });

    return fields;
};

const withValidatedForm = (Fields, {submissionTitle, submissionUrl, fieldsDef, validator}) => {

    class ValidatedForm extends PureComponent {

        constructor(props) {
            super(props);

            this.state = {
                fields: enrichFields(fieldsDef),
                meta: {submitting: false},
            };

            this.onFieldChange = this.onFieldChange.bind(this);
            this.onSubmission = this.onSubmission.bind(this);
        }

        onFieldChange({target}) {
            const {fields} = this.state;

            const {name, value} = target, field = fields[name];
            const previousValue = field.value;
            const dirty = previousValue !== value;

            if (dirty) {
                const newField = {...field, dirty, value, loading: true};
                this.setField(newField);
                this.handleFieldValidation(newField);
            }
        };

        handleFieldValidation({name, value}) {
            this.cancelPreviousValidation(name);

            const {cancel} = validator
                .validateField({[name]: value})
                .done((result) => this.handleValidationResult(name, result));

            activeValidations[name] = cancel;
        };

        cancelPreviousValidation(name) {
            const validationTask = activeValidations[name];
            validationTask && validationTask();

            delete activeValidations[name];
        };

        handleValidationResult(name, {hasErrors, getErrors}) {
            const valid = !hasErrors(name);
            const errors = getErrors(name);

            const newField = {name, valid, errors, loading: false};
            this.setField(newField);

            activeValidations[name] = undefined;
        };

        setFieldErrors(fieldErrors) {
            const {fields} = this.state;

            let errorFields = {};

            for (const name in fieldErrors) {
                const errors = fieldErrors[name];

                if (errors && errors.length > 0) {
                    errorFields[name] = {...fields[name], errors, valid: false};
                }
            }

            this.setFields(errorFields);
        };

        onSubmission(event) {
            event.preventDefault();

            const validatedFields = this.validateBeforeSubmission();

            if (this.isFormValid(validatedFields)) {
                this.setMeta({submitting: true});

                this.submitForm().then(() => {
                    this.setMeta({submitting: false});
                });
            }
        };

        validateBeforeSubmission() {
            const {fields} = this.state;

            if (!this.isFormValid(fields)) {
                return fields;
            }

            const fieldValues = this.extractFieldValues(fields);
            const {hasErrors, getErrors} = validator.validateFields(fieldValues);
            const validatedFields = {};

            for (const name in fields) {
                const valid = !hasErrors(name);
                const errors = getErrors(name);

                validatedFields[name] = {
                    ...fields[name], valid, errors, dirty: true
                };
            }

            this.setFields(validatedFields);

            return validatedFields;
        };

        extractFieldValues(fields) {
            const fieldValues = {};

            Object.values(fields).forEach(({name, value}) => fieldValues[name] = value);

            return fieldValues;
        };

        isFormValid(fields) {
            return Object.values(fields).every(({valid}) => valid);
        };

        submitForm() {
            const {fields} = this.state;

            console.log(`Sending request to ${submissionUrl}...`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setFieldErrors({
                        email: fields.email.value.includes("micha") ? ['Email already exists'] : [],
                        username: fields.username.value.includes("micha") ? ['Username is not allowed'] : [],
                        password: fields.password.value.includes("123") ? ['Password is not allowed'] : []
                    });
                    resolve();
                }, 1500);
            })
        }

        setMeta(metaOverrides) {
            this.setState(({meta}) => ({
                meta: {
                    ...meta,
                    ...metaOverrides
                }
            }));
        }

        setField(fieldOverrides) {
            const {name} = fieldOverrides;

            this.setState(({fields}) => ({
                fields: {
                    ...fields,
                    [name]: {...fields[name], ...fieldOverrides}
                }
            }));
        }

        setFields(fieldsOverrides) {
            this.setState(({fields}) => ({
                fields: {
                    ...fields,
                    ...fieldsOverrides
                }
            }));
        }

        render() {
            const {meta, fields} = this.state;

            const enhancedProps = {
                fields,
                onFieldChange: this.onFieldChange,
            };

            return (
                <Form submissionTitle={submissionTitle}
                      onSubmit={this.onSubmission} {...meta}>
                    <Fields {...this.props} {...enhancedProps}/>
                </Form>
            );
        }
    }

    ValidatedForm.propTypes = {};

    return ValidatedForm;
};

export default withValidatedForm;