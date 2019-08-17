import React from "react";

import "./style.scss";

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