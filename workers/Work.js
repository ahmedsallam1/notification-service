import NotifiableService from '../services/NotifiableService';
import User from '../models/User';
import TranslationService from '../services/TranslationService';
import { Worker } from 'bullmq';
import SMSProvider from '../providers/SMSProvider';
import PushProvider from '../providers/PushProvider';
import EmailProvider from '../providers/EmailProvider';
import NotificationService from  '../services/NotificationService';

export default class Work {

    /**
     * @param Type
     */
    constructor(Type) {
        this.Type = Type;
        this.NotificationService = new NotificationService();
    }

    /**
     * @returns {Promise<Worker<any>>}
     */
    async do() {
        return new Worker(this.Type.queue, async job => {
            this.Notification = job.data
            let users = await this.getUsers()

            await this.sendToUsers(users);
            await this.NotificationService.create(this.Notification);

        }, {
            connection: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });
    }

    /**
     * @param users
     * @returns {Promise<void>}
     */
    async sendToUsers(users) {
        for await (const user of users) {
            this.Type
                .setTranslator(this.translationFactory(user.locale || this.Notification.locale));

            for await (const channel of this.Type.channels) {
                await this[channel](await this.Type[channel](this.Notification.data), user);
            }
        }
    }

    /**
     * @param message
     * @param user
     * @returns {Promise<void>}
     */
    async sms(message, user) {
        return await new SMSProvider(message, user.phone).send();
    }

    /**
     * @param message
     * @returns {Promise<void>}
     */
    async push(message) {
        return new PushProvider(message, 'FAKE_TOKEN').send();
    }

    /**
     * @param message
     * @param user
     * @returns {Promise<void>}
     */
    async email(message, user) {
        return new EmailProvider(message, user.email).send();
    }

    /**
     * @returns {Promise<*>}
     */
    async getUsers() {
        let notifiableService = new NotifiableService(this.Notification.notifiableType, User);

        return await notifiableService.get(this.Notification.notifiableId);
    }

    /**
     * @param locale
     * @returns {Translation}
     */
    translationFactory(locale) {
        return new TranslationService(locale);
    }
}
