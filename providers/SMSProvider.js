export default class SMSProvider {

    /**
     * @param message
     * @param phone
     */
    constructor(message, phone) {
        this.message = message;
        this.phone = phone;
    }

    /**
     * @returns {Promise<void>}
     */
    async send() {
        console.log(`${this.message} has been sent to ${this.phone}`);
    }
}