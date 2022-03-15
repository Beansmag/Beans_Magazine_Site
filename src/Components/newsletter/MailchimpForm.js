import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import PrimaryCTAButton from "./PrimaryCTAButton";
import InputField from "./InputField";

const CustomForm = ({ status, message, onValidated }) => {

    // const {modalOpen, setModalOpen} = useGHStContext();
    const [modalOpen, setModalOpen] = useState()
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('')
    const [tUAYR, settUAYR] = useState('')
    const [instaHandle, setinstaHandle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        firstName &&
        lastName &&
        phone &&
        email.indexOf("@") > -1 &&
        onValidated({
            MERGE0: email,
            MERGE1: firstName,
            MERGE2: lastName,
            MERGE4: phone,
            MERGE6: tUAYR,
            MERGE7: instaHandle,
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
        setPhone('');
        settUAYR('');
        setinstaHandle('')
    }

    return (
        <form
            // className="mc__form"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h3>
            {/* <h3 className="mc__title"> */}
                {status === "success" ? "Success!" :
                    "Join our email list for future updates."}
            </h3>

            {status === "sending" && (
                <div
                    // className="mc__alert mc__alert--sending"
                >sending...</div>
            )}
            {status === "error" && (
                <div
                    // className="mc__alert mc__alert--error"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    // className="mc__alert mc__alert--success"
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
                        isRequired
                    />
                    <InputField
                        label="Phone"
                        onChangeHandler={setPhone}
                        type="phone"
                        value={phone}
                        isRequired
                    />
                    <InputField
                        label="Tell us about your Ride"
                        onChangeHandler={settUAYR}
                        type="text"
                        value={tUAYR}
                        isRequired
                    />
                    <InputField
                        label="Instagram Handle"
                        onChangeHandler={setinstaHandle}
                        type="text"
                        value={instaHandle}
                        isRequired
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
                    label="subscribe"
                    type="submit"
                    formValues={[email, firstName, lastName, phone, tUAYR, instaHandle]}
                />

            }
        </form>
    );
};


const MailchimpForm = props => {
    const url = `https://westcoastcustoms.us19.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

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