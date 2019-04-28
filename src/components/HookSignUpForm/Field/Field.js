import React from "react";
import "./Field.scss";
import Loader from "./Loader/Loader";

const Field = ({meta, ...inputProps}) => {
    const {dirty, valid, loading, error} = meta;
    const validationClass = () => dirty ? `is-${valid ? 'valid' : 'invalid'}` : '';
    const renderError = () => <div className='field-error'>{error}</div>;

    return (
        <>
            <div className='input-container'>
                <input className={`form-control form-control-lg ${validationClass()}`}
                       data-lpignore="true"
                       {...inputProps}/>
                {
                    loading && <div className='loader-container'>
                        <Loader/>
                    </div>
                }
            </div>

            {error && renderError()}
        </>
    )
};

export default Field;