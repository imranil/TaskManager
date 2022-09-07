import { useEffect, useState } from "react";


const useValidation = (value, validations) => {
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [isEmpty, setEmpty] = useState(true)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    reg.test(String(value)) ? setEmailError(false) : setEmailError(true)
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if(isEmpty || emailError || minLengthError || maxLengthError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, emailError, minLengthError, maxLengthError])

    return {
        isEmpty,
        emailError,
        minLengthError,
        maxLengthError,
        inputValid
    }
};

export default useValidation;