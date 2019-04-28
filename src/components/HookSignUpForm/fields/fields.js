const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const requiredValidator = (value, name) => {
    if (value.length > 0) {
        return {valid: true};
    }

    return {valid: false, error: `${cap(name)} is required`};
};

const passwordLengthValidator = (value) => {
    if (value.length >= 3) {
        return {valid: true};
    }

    return {valid: false, error: 'Password is too short'};
};

const passwordStrengthValidator = (password, next) => {
    console.log("checking password strength...", Date.now());

    setTimeout(() => {
        next(password.length >= 5 ? {valid: true} : {valid: false, error: "password is too weak"});
    }, 5000);
};


const fieldsDef = {
    email: {
        value: '',
        validators: [requiredValidator]
    },
    username: {
        value: '',
        validators: [requiredValidator]
    },
    password: {
        value: '',
        validators: [requiredValidator, passwordLengthValidator],
        asyncValidator: {
            validator: passwordStrengthValidator,
            debounceTime: 3000
        }
    }
};

export default fieldsDef;