import React from 'react';

const PrimaryCTAButton = props => {

    return (
        <button
            className={`submitButtonNews 
            ${props.size === 'big' ? "submitButtonNews" : "submitButtonNews"}
            ${props.icon ? "submitButtonNews" : null}
            ${props.customClass}`}
            onClick={props.handleClick}
        >
            {props.icon && props.icon}
            {props.label}
        </button>


    );
}

export default PrimaryCTAButton;