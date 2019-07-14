import React from "react";
import "./Field.scss";
import Loader from "./Loader/Loader";
import FieldErrors from "./FieldErrors/FieldErrors";

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