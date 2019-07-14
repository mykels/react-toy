import React from "react";

import "./FieldErrors.scss";

const FieldErrors = ({errors}) => {
    return (
        errors.map((error) => (
            <div key={error} className='field-error'>
                {error}
            </div>
        ))
    )
};

export default FieldErrors;