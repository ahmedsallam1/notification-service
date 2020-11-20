import { MESSAGES as ar } from '../translations/ar';
import { MESSAGES as en } from '../translations/en';

export default class Translation {

    /**
     * @param local
     */
    constructor(local) {
        this.local = local;
    }

    /**
     * @param key
     * @param params
     * @returns {Promise<*>}
     */
    async translate(key, params) {
        switch (this.local) {
            case 'ar':
                return await this.map(ar, key, params);
            case 'en':
                return await  this.map(en, key, params);
            default:
                return key;
        }
    }

    /**
     * @param messages
     * @param key
     * @param params
     * @returns {Promise<*>}
     */
    async map(messages, key, params) {
        try {
            let message;

            for await (const item of key.split('.')) {
                messages = messages[item];
                message = messages;
            }

            if (!message) {
                return key;
            }

            for await (const [index, value] of Object.entries(params)) {
                message = message.replace(index, value);
            }

            return message;
        } catch (error) {
            return key;
        }
    }
}