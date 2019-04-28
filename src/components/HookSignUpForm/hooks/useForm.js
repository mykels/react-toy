import {useState} from "react";

const buildField = (fieldValue, name) => {
    const meta = {dirty: false, valid: false};
    return {...fieldValue, name, meta};
};

const buildFields = (fieldValues) => {
    for (const name in fieldValues) {
        fieldValues[name] = buildField(fieldValues[name], name);
    }

    return fieldValues;
};

const cancelJob = ({debouncedJob}) => clearTimeout(debouncedJob);

const debounceJob = (jobProps, job) => {
    cancelJob(jobProps);

    jobProps.debouncedJob = setTimeout(job, jobProps.debounceTime);
};

const useForm = (onSubmit, fieldValues) => {
    const [fields, setFields] = useState(buildFields(fieldValues));
    const [meta, setMeta] = useState({submitting: false});

    const setFieldMeta = (field, name, meta) => {
        meta = {...field.meta, ...meta};
        return {...field, meta};
    };

    const updateFieldMeta = (field, name, meta) => {
        const newField = setFieldMeta(field, name, meta);
        setFields({...fields, [name]: newField});
    };


    const checkAsyncValidator = (asyncValidator, field, name) => {
        const {value} = field;

        debounceJob(asyncValidator, () => {
            if (asyncValidator.executionValue !== value) {
                updateFieldMeta(field, name, {loading: true, error: undefined});
                asyncValidator.executionValue = value;

                asyncValidator.validator(value, ({valid, error}) => {
                    if (asyncValidator.executionValue === value) {
                        updateFieldMeta(field, name, {valid, error, loading: false});
                    }
                });
            }
        });
    };

    const validateField = (validators, field, name) => {
        const {value, meta} = field;
        const previouslyValid = meta.valid;

        if (validators) {
            for (const validator of validators) {
                const {valid, error} = validator(value, name);

                if (!valid) {
                    return setFieldMeta(field, name, {valid, error});
                }
            }
        }

        if (!previouslyValid) {
            return setFieldMeta(field, name, {valid: true, error: undefined});
        }

        return field;
    };

    const onFieldChange = async ({target}) => {
        const {value, name} = target, field = fields[name];
        const {validators, asyncValidator, meta} = field;
        const previousValue = field.value;
        const dirty = previousValue !== value;
        const newField = {...field, value, meta: {...meta, dirty}};

        if (!dirty) return;

        // TODO: make prettier (extract)
        const validatedField = validateField(validators, newField, name);
        if (!fieldValid(validatedField)) {
            if (asyncValidator) {
                // TODO: make prettier (extract)  
                cancelJob(asyncValidator);
                asyncValidator.executionValue = undefined;
                const newField = setFieldMeta(validatedField, name, {loading: false});
                setFields({...fields, [name]: newField});
            } else {
                setFields({...fields, [name]: validatedField});
            }
            return;
        }

        if (asyncValidator) {
            checkAsyncValidator(asyncValidator, newField, name);
        }

        setFields({...fields, [name]: validatedField});
    };

    const setErrors = (errors) => {
        let newFields = {...fields};

        for (const name in errors) {
            const field = fields[name];
            const error = errors[name];
            const {meta} = field;
            const newField = {...fields[name], meta: {...meta, error, valid: false}};
            newFields = {...newFields, [name]: newField};
        }

        setFields(newFields);
    };

    const setFieldsDirty = () => {
        let newFields = {...fields};

        for (const name in fields) {
            const field = fields[name];
            const {meta} = field;
            const newField = {...fields[name], meta: {...meta, dirty: true}};
            newFields = {...newFields, [name]: newField};
        }

        return newFields;
    };

    const validateFields = (fields) => {
        for (const name in fields) {
            const field = fields[name];
            const {validators} = field;
            const validatedField = validateField(validators, field, name);
            fields = {...fields, [name]: validatedField};
        }

        return fields;
    };

    const fieldValid = ({meta}) => meta.valid;

    const fieldsValid = (fields) => {
        for (const name in fields) {
            if (!fieldValid(fields[name])) {
                return false;
            }
        }

        return true;
    };

    const onSubmission = async (event) => {
        event.preventDefault();

        const newFields = setFieldsDirty();
        const validatedFields = validateFields(newFields);

        setFields(validatedFields);

        if (fieldsValid(validatedFields)) {
            setMeta({...meta, submitting: true});
            await onSubmit();
            setMeta({...meta, submitting: false});
        }
    };

    return {
        meta,
        fields,
        onFieldChange,
        setErrors,
        onSubmission
    }
};

export default useForm;