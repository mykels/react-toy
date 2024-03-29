import {useState} from "react";

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

const useForm = (onSubmit, fieldsDef, validator) => {
    const [fields, setFields] = useState(enrichFields(fieldsDef));
    const [meta, setMeta] = useState({submitting: false});

    const onFieldChange = async ({target}) => {
        const {name, value} = target, field = fields[name];
        const previousValue = field.value;
        const dirty = previousValue !== value;

        if (!dirty) return;

        const newField = {...field, dirty, value, loading: true};
        setFields((fields) => ({...fields, [name]: newField}));

        handleFieldValidation(newField);
    };

    const handleFieldValidation = ({name, value}) => {
        cancelPreviousValidation(name);

        const {cancel} = validator.validateField({[name]: value})
            .done((result) => handleValidationResult(name, result));

        activeValidations[name] = cancel;
    };

    const cancelPreviousValidation = (name) => {
        const validationTask = activeValidations[name];
        validationTask && validationTask();

        delete activeValidations[name];
    };

    const handleValidationResult = (name, {hasErrors, getErrors}) => {
        const valid = !hasErrors(name);
        const errors = getErrors(name);

        setFields((fields) => ({
            ...fields,
            [name]: {
                ...fields[name], valid, errors, loading: false
            }
        }));

        activeValidations[name] = undefined;
    };

    const setFieldErrors = (fieldErrors) => {
        let newFields = {...fields};

        for (const name in fieldErrors) {
            const errors = fieldErrors[name];
            const newField = {...fields[name], errors, valid: false};
            newFields = {...newFields, [name]: newField};
        }

        setFields(newFields);
    };

    const onSubmission = async (event) => {
        event.preventDefault();

        const validatedFields = validateBeforeSubmission();

        if (isFormValid(validatedFields)) {
            setMeta({...meta, submitting: true});
            await onSubmit(fields);
            setMeta({...meta, submitting: false});
        }
    };

    const validateBeforeSubmission = () => {
        const fieldValues = getFieldValues(fields);
        const {hasErrors, getErrors} = validator.validateFields(fieldValues);
        const validatedFields = {};

        for (const name in fields) {
            const valid = !hasErrors(name);
            const errors = getErrors(name);

            validatedFields[name] = {
                ...fields[name], valid, errors, dirty: true
            };
        }

        setFields(validatedFields);

        return validatedFields;
    };

    const getFieldValues = (fields) => {
        const fieldValues = {};

        Object.values(fields).forEach(({name, value}) => fieldValues[name] = value);

        return fieldValues;
    };

    const isFormValid = (fields) => {
        return Object.values(fields).every(({valid}) => valid);
    };

    return {
        meta,
        fields,
        onFieldChange,
        onSubmission,
        setFieldErrors
    }
};

export default useForm;