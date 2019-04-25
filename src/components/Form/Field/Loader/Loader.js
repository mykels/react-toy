import React from "react";
import "./Loader.scss";

const Loader = (props) => {
    const completeClass = props.complete ? 'load-complete' : '';
    const validClass = props.complete ? (props.valid ? 'is-valid' : 'is-invalid') : '';
    const className = `circle-loader ${completeClass} ${validClass}`;

    return (
        <div className={className}/>
    )
};

export default Loader;