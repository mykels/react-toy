import React from "react";
import './index.scss';
import Loader from "../Field/Loader/Loader";

export const Form = ({children, submitText, submitting, ...formProps}) => {

    return <form className="form-container" noValidate="novalidate" {...formProps}>
        {children}

        <div className='submit-container'>
            <button type="submit"
                    className='btn btn-primary submit-button'
                    disabled={submitting}>
                {submitting ? <Loader/> : <span>{submitText}</span>}
            </button>
        </div>
    </form>;
};