export class EmailAlreadyInUserError extends Error {
    constructor(email) {
        super(`The provided e-mail ${email} address is already in use.`)
    }
}