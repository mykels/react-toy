import React from "react";
import './index.scss';
import Loader from "../Field/Loader/Loader";

export const Form = (props) => {
    const {meta, children, submitText, ...rest} = props;

    return <form className="form-container" noValidate="novalidate" {...rest}>
        {children}

        <div className='submit-container'>
            <button type="submit"
                    className='btn btn-primary submit-button'
                    disabled={meta.submitting}>
                {meta.submitting ? <Loader/> : <span>{submitText}</span>}
            </button>
        </div>
    </form>;
};