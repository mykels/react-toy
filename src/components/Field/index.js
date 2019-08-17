import React from "react";
import Loader from "./Loader";
import FieldErrors from "./FieldErrors";

import "./style.scss";

const Field = ({dirty, valid, loading, errors, ...inputProps}) => {
    const validationClass = dirty ? `is-${valid ? 'valid' : 'invalid'}` : '';

    return (
        <>
            <div className='input-container'>
                <input className={`form-control form-control-lg ${validationClass}`}
                       data-lpignore="true"
                       {...inputProps}/>
                {
                    loading &&
                    <div className='loader-container'>
                        <Loader/>
                    </div>
                }
            </div>

            {errors && <FieldErrors errors={errors}/>}
        </>
    )
};

export default Field;