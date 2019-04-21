import React from "react";
import "./Field.scss";

const Field = (props) => {
    const validationClass = () => props.field.dirty ? (props.field.valid ? 'is-valid' : 'is-invalid') :'';
    const hasError = () => !!props.field.error;
    const renderError = () => {
        return <div className='field-error'>{props.field.error}</div>;
    };

    return (
        <>
            <input className={`form-control form-control-lg ${validationClass()}`} {...props}/>
            {hasError() && renderError()}
            <div className="circle-loader">
                <div className="checkmark draw"></div>
            </div>
            <div className="circle-loader load-complete">
                <div className="checkmark draw" style={{display:'block'}}></div>
            </div>
        </>
    )
};

export default Field;