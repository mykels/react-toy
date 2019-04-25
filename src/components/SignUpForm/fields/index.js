
const requiredValidator = (password) => {
    if (password.length >= 3) {
        return {valid: true};
    }

    return {valid: false, error: 'Password is too short'};
};

const passwordStrengthValidator = (password, resolve, reject) => {
    console.log("checking password strength...", Date.now());

    setTimeout(() => {
        resolve(password.length >= 5 ? {valid: true} : {valid: false, error: "password is too weak"});
    }, 2000);
};

const email = {
    input: {
        id: 'email',
        type: 'email',
        name: 'email',
        placeholder: "Enter Email..",
        value: '',
    },
    meta: {}

};

const username = {
    input: {
        id: 'username',
        type: 'text',
        name: 'username',
        placeholder: "Enter Username..",
        value: '',
    },
    meta: {}

};

const password = {
    input: {
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: "Enter Password..",
        value: '',
    },
    meta: {
        validators: [requiredValidator],
        asyncValidator: {
            validator: passwordStrengthValidator,
            debounceTime: 500
        }
    }
};

const fields = [email, username, password];

export default fields;