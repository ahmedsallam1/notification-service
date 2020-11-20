export default class SMSProvider {

    /**
     * @param message
     * @param email
     */
    constructor(message, email) {
        this.message = message;
        this.email = email;
    }

    /**
     * @returns {Promise<void>}
     */
    async send() {
        console.log(`${this.message} has been sent to ${this.email}`);
    }
}