import passable from "passable";
import * as _ from "lodash";

export class Validator {

    constructor(formName) {
        this.formName = formName;
        this.debouncedTasks = {};
    }

    validateField(data) {
        return this.validateFields(data, Object.keys(data)[0]);
    }

    validateFields(data, specific) {
        return passable(this.formName, (test, draft) => {
            this.test = test;
            this.draft = draft;
            this.specific = specific;

            this.performValidation(data)
        }, specific);
    }

    debouncedTest(name, error, task, debounce) {
        if (this.shouldDebounceTest(name)) {
            this.test(name, error, new Promise((resolve, reject) => {
                this.cancelPreviousTask(name);

                const debouncedTask = () => task().then(resolve, reject);

                this.debouncedTasks[name] = _.debounce(debouncedTask, debounce);

                this.debouncedTasks[name]();
            }));
        }
    }

    shouldDebounceTest(name) {
        return !this.draft.hasErrors(name) &&
            (this.specific && this.specific === name);
    }

    cancelPreviousTask(name) {
        this.debouncedTasks[name] && this.debouncedTasks[name].cancel();

        delete this.debouncedTasks[name];
    }

    performValidation() {
        throw new Error('You have to implement the method [performValidation]!');
    }

}