import React from "react";
import "./Field.scss";
import Loader from "./Loader/Loader";

const Field = (props) => {

    const validationClass = () => props.meta.dirty ? (props.meta.valid ? 'is-valid' : 'is-invalid') : '';
    const hasError = () => !!props.meta.error;
    const renderError = () => <div className='field-error'>{props.meta.error}</div>;
    const shouldRenderLoader = () => props.meta.loading || props.meta.valid;

    return (
        <>
            <div className='input-container'>
                <input className={`form-control form-control-lg ${validationClass()}`}
                       data-lpignore="true"
                       {...props.input}
                       onChange={props.onChange}/>
                {
                    shouldRenderLoader() && <div className='loader-container'>
                        <Loader complete={props.meta.valid} valid={props.meta.valid}/>
                    </div>
                }
            </div>

            {hasError() && renderError()}
        </>
    )
};

export default Field;