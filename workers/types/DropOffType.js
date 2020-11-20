
import { TYPES as QUEEUS } from '../../Constants/Notification';

const QUEUE = QUEEUS.DROP_OFF;
const CHANNELS = [
    'sms',
    'email',
    'push',
];
export default class DropOffType {
    constructor() {
        this.queue = QUEUE;
        this.channels = CHANNELS;
    }

    /**
     * @param data
     * @returns {Promise<*>|*|void}
     */
    sms(data) {
        return this
        .translator
        .translate('promotions.sms', {'%code%': data.promoCode});
    }

    /**
     * @param data
     * @returns {Promise<*>|*|void}
     */
    push(data) {
        return this
        .translator
        .translate('promotions.push', {'%code%': data.promoCode});
    }

    /**
     * @param data
     * @returns {Promise<*>|*|void}
     */
    email(data) {
        return this
        .translator
        .translate('promotions.email', {'%code%': data.promoCode});
    }

    /**
     * @param translator
     */
    setTranslator(translator) {
        this.translator = translator;
    }
}