import React from "react";
import Index from "../Field/Loader";

import './style.scss';

const Form = ({children, submissionTitle, submitting, ...formProps}) => {

    return <form className="form-container" noValidate="novalidate" {...formProps}>
        {children}

        <div className='submit-container'>
            <button type="submit"
                    className='btn btn-primary submit-button'
                    disabled={submitting}>
                {submitting ? <Index/> : <span>{submissionTitle}</span>}
            </button>
        </div>
    </form>;
};

export default Form;