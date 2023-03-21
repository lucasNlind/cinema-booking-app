import { useReducer } from 'react';
import { INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR } from './models/InputAction';

const initialInputState = {
    text: '',
    hasBeenTouched: false
}

const inputReducer = (state, action) => {
    const { type, value = '' } = action;

    switch(type) {
        case INPUT_ACTION_CHANGE:
            return { text: value, hasBeenTouched: state.hasBeenTouched };
        case INPUT_ACTION_BLUR:
            return { text: state.text, hasBeenTouched: true }; // Blur occurs when you click out of an input field
        case INPUT_ACTION_CLEAR:
            return { text: '', hasBeenTouched: false };
        default:
            return { ...state };
    }
};

const useInput = (validatorFn) => {
    const [{ text, hasBeenTouched }, dispatch] = useReducer(
        inputReducer,
        initialInputState
    );

    let shouldDisplayError;

    if (validatorFn) {
        const isValid = validatorFn(text);
        shouldDisplayError = !isValid && hasBeenTouched;
    }

    const inputChangeHandler = (e) => {
        dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
    };

    const inputBlurHandler = () => {
        dispatch({ type: INPUT_ACTION_BLUR });
    };

    const inputClearHandler = () => {
        dispatch({ type: INPUT_ACTION_CLEAR });
    }

    return { text, shouldDisplayError, inputChangeHandler, inputBlurHandler, inputClearHandler };
}

export default useInput;
