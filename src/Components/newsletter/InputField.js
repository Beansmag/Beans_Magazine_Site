import React from 'react';
import '../../Styles/Newsletter.css'

const InputField = props => {
    const validateInput = values => {
        if (values.some(f => f === "") || values[0].indexOf("@") === -1) {
            return true
        } else {
            return false
        }
    }

    if (props.type === "submit") {
        return (
            <input
                className='submitButtonNews'
                type='submit'
                value={props.label}
                disabled={validateInput(props.formValues)}
            />
        )
    } else if (props.type === "textarea") {
        return (
           <label className="inputNewsletter">
                {props.label}
                <textarea
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    placeholder={props.placeholder}
                    value={props.value}
                    required={props.isRequired}
                    className="inputFieldNewsletter"
                    rows={7}
                    name={props.name}
                />
            </label>
        );
    } else {
        return (
            <label className="inputNewsletter">
                {props.label}
                <input
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    required={props.isRequired}
                    className="inputFieldNewsletter"
                    name={props.name}
                />
            </label>
        );
    }


};

export default React.memo(InputField);
