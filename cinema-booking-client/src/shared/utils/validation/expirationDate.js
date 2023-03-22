export const validateExpirationDate = (expirationDate) => {
    const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    return re.test(expirationDate.trim());
}
