export const validatePhoneNumber = (phoneNumber) => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    return re.test(phoneNumber.trim());
}
