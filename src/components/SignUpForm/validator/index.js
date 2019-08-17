import {enforce} from 'passable';
import {checkUsername} from "../../../utils/checkUsername";
import {Validator} from "../../../utils/validator";

const FORM_NAME = 'SignUpForm';

export class SignUpValidator extends Validator {

    constructor() {
        super(FORM_NAME);
    }

    performValidation({email, username, password}) {
        this.validateEmail(email);
        this.validateUsername(username);
        this.validatePassword(password);
    };

    validateEmail = (email) => {
        this.test('email', 'This is not a valid email address', () => {
            enforce(email)
                .isNotEmpty()
                .matches(/[^@]+@[^\.]+\..+/g);
        });
    };

    validateUsername = (username) => {
        this.test('username', 'Username is too short', () => {
            enforce(username)
                .isString()
                .longerThanOrEquals(4);
        });

        this.debouncedTest('username', 'Username already exists',
            () => checkUsername(username), 500
        );
    };

    validatePassword = (password) => {
        this.test('password', 'Must be at least 6 chars', () => {
            enforce(password)
                .isString()
                .longerThanOrEquals(6);
        });
    };

}