import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignUpForm from "./index";
import {fieldsDef} from "./constants";
import Field from "../Field";
import Form from "../Form";

Enzyme.configure({adapter: new Adapter()});

describe('SignUpForm', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<SignUpForm/>);
    });

    const updateFieldValue = (name, value) => {
        const fieldInput = wrapper.find('input').find({name});
        fieldInput.simulate('change', {target: {name, value}});

        return wrapper.find({name}).find(Field).props();
    };

    const assertFieldInitialized = (name) => {

        it(`Should render initialized field [${name}]`, () => {
            const {valid, loading, errors, dirty, value} = wrapper.find({name}).find(Field);

            expect(value).toBeUndefined();
            expect(dirty).toBeFalsy();
            expect(valid).toBeFalsy();
            expect(loading).toBeFalsy();
            expect(errors).toBeUndefined();
        });

    };

    const assertFieldUpdate = (name) => {

        it(`Should update field [${name}] value on change`, () => {
            const value = 'some value';
            const {dirty, value: updatedValue} = updateFieldValue(name, value);

            expect(updatedValue).toBe(value);
            expect(dirty).toBeTruthy();
        });

    };

    const assertSyncFieldValid = ({name, value}) => {

        it(`Should update field [${name}] upon passed validation`, () => {
            const {valid, loading, errors} = updateFieldValue(name, value);

            expect(valid).toBeTruthy();
            expect(loading).toBeFalsy();
            expect(errors).toHaveLength(0);
        });

    };

    const assertSyncFieldInvalid = ({name, value, expectedErrors}) => {

        it(`Should update field [${name}] upon failed validation`, () => {
            const {valid, loading, errors} = updateFieldValue(name, value);

            expect(valid).toBeFalsy();
            expect(loading).toBeFalsy();
            expect(errors).toEqual(expectedErrors);
        });

    };

    const submitForm = () => {
        const submitButton = wrapper.find({type: 'submit'}).find('button');
        submitButton.simulate('click');
    };

    describe('Field Initialization', () => {
        fieldsDef.forEach(assertFieldInitialized);
    });

    describe('Field Updates', () => {
        fieldsDef.forEach(assertFieldUpdate);
    });

    describe('Field Validations', () => {
        describe('Email Validations', () => {
            describe('When email is valid', () => {
                assertSyncFieldValid({name: 'email', value: 'micha1991g@gmail.com'});
            });

            describe('When email address does not match regex', () => {
                assertSyncFieldInvalid({
                    name: 'email',
                    value: 'micha',
                    expectedErrors: ["This is not a valid email address"]
                });
            });
        });

        describe('Password Validations', () => {
            describe('When password is valid', function () {
                assertSyncFieldValid({name: 'password', value: '29384987'});
            });

            describe('When password is less then 6 chars', function () {
                assertSyncFieldInvalid({name: 'password', value: '123', expectedErrors: ["Must be at least 6 chars"]});
            });
        });
    });
});