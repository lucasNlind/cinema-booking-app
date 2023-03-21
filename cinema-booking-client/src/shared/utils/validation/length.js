const _validateLength = (text, options) => {
    const textLength = text.trim().length;
    if (options?.min && textLength < options.min) return false;
    if (options?.max && textLength > options.max) return false;
    return true;
}

export const validateNameLength = (text) => {
    return _validateLength(text, { min: 2 });
}

export const validatePasswordLength = (text) => {
    return _validateLength(text, { min: 6, max: 20 });
};

export const validateZipCodeLength = (text) => {
    return _validateLength(text, { min: 5, max: 5 });
}
