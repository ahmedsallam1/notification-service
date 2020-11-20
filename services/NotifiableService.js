import {TYPES as notifiableTypes} from '../Constants/NotifiableType';

export default class Notifiable {

    /**
     * @param type
     * @param User
     */
    constructor(
        type,
        User
    ) {
        this.notifiableType = type;
        this.user = User;
    }

    /**
     * @param id
     * @returns {Promise<*>}
     */
    async get(id) {
        switch (this.notifiableType) {
            case notifiableTypes.INDIVIDUAL:
                return await this.getByUser(id)
            case notifiableTypes.GROUP:
                return await this.getByGroup(id)
            default:
                return [];
        }
    }

    /**
     * @param id
     * @returns {Promise<*|Array>}
     */
    async getByUser(id) {
        return await this.user.find({
            'id': id
        }) || [];
    }

    /**
     * @param id
     * @returns {Promise<*|Array>}
     */
    async getByGroup(id) {
        return await this.user.find({
            'group': id
        }) || [];
    }
}