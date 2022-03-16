import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import PrimaryCTAButton from "./PrimaryCTAButton";
import InputField from "./InputField";

import '../../Styles/Newsletter.css'

const CustomForm = ({ status, message, onValidated }) => {

    const [modalOpen, setModalOpen] = useState()
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        firstName &&
        lastName &&
        birthday &&
        email.indexOf("@") > -1 &&
        onValidated({
            MERGE0: email,
            MERGE1: firstName,
            MERGE2: lastName,
            MERGE3: birthday,
        });
    }

    useEffect(() => {
        if(status === "success") clearFields();
        if(modalOpen && status === "success") clearFields();
    }, [status, modalOpen])

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setBirthday('');
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
        >
            <h3>
                {status === "success" ? "Success!" :
                    "Join our email list for future updates."}
            </h3>

            {status === "sending" && (
                <div
                >sending...</div>
            )}
            {status === "error" && (
                <div
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status !== "success" ? (
                <div className="inputTextStyling">
                    <InputField
                        label="First Name"
                        onChangeHandler={setFirstName}
                        type="text"
                        value={firstName}
                        isRequired
                    />
                    <InputField
                        label="Last Name"
                        onChangeHandler={setLastName}
                        type="text"
                        value={lastName}
                        isRequired
                    />
                    <InputField
                        label="Email"
                        onChangeHandler={setEmail}
                        type="email"
                        value={email}
                        // isRequired
                    />
                    <InputField
                        label="Birthday"
                        onChangeHandler={setBirthday}
                        type="birthday"
                        value={birthday}
                        // isRequired
                    />
                </div>
            ) : null}
            {
                status === 'success' ? <PrimaryCTAButton
                    handleClick={() => setModalOpen(false)}
                    label="Thank You"
                    size="big"
                    customClass="submitButtonNews"
                /> : <InputField
                    label="Subscribe"
                    type="submit"
                    formValues={[email, firstName, lastName, birthday]}
                />

            }
        </form>
    );
};


const MailchimpForm = props => {
    const url = `https://beans-magazine.us14.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

    return (
        <div className="formDiv">
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>

    )
}

export default MailchimpForm;