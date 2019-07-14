import passable, {enforce} from 'passable';

const FORM_NAME = 'SignUpForm';

let checkUsernameTask;

export const validateField = (data) => validateFields(data, Object.keys(data)[0]);

export const validateFields = (data, specific) =>
    passable(FORM_NAME, (test) => validations(data, test), specific);

const validations = ({username, email, password}, test) => {
    test('email', 'Is not a valid email address', () => {
        enforce(email)
            .isNotEmpty()
            .matches(/[^@]+@[^\.]+\..+/g);
    });

    test('username', 'Username already exists', () => {
        enforce(username)
            .isString()
            .longerThanOrEquals(4);

        return new Promise((resolve, reject) => {
            checkUsernameTask && clearTimeout(checkUsernameTask);

            return checkUsernameTask = setTimeout(() => {
                simulateCheckUser(username, resolve, reject);
            }, 1000);
        })
    });

    test('password', 'Must be at least 6 chars', () => {
        enforce(password)
            .isString()
            .longerThanOrEquals(6);
    });
};

const simulateCheckUser = (username, resolve, reject) => {
    console.log("simulating check user");

    return new Promise(() => setTimeout(() => {
        username.includes("micha") ? reject() : resolve();
    }, 2000))
};