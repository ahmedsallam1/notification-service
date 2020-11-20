export default class SMSProvider {

    /**
     * @param message
     * @param token
     */
    constructor(message, token) {
        this.message = message;
        this.token = token;
    }

    /**
     * @returns {Promise<void>}
     */
    async send() {
        console.log(`${this.message} has been sent to ${this.token}`);
    }
}