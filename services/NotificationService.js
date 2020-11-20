import Notification from '../models/Notification';
import { Queue } from 'bullmq';

export default class NotificationService {

    /**
     * @param request
     * @returns {Promise<boolean>}
     */
    async handle(request) {
        let notification = await this.populate(request);
        await this.addJob(notification.type, notification);

        return true;
    }

    /**
     * @param payload
     * @returns {Promise<void>}
     */
    async populate(payload) {
        let notification = new Notification({
            'type': payload.type,
            'notifiableType': payload.notifiableType,
            'notifiableId': payload.notifiableId,
            'locale': payload.locale,
            'data': payload.data
        });

        return notification;
    }

    /**
     * @param queueName
     * @param notification
     * @returns {Promise<Job<any, any>>}
     */
    async addJob(queueName, notification) {
        let queue = new Queue(queueName, {
            limiter: {
              max: 1000,
              duration: 200
            },
            connection: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });
        
        return await queue.add('notification', notification);
    }

    /**
     * @param notification
     * @returns {Promise<*>}
     */
    async create(notification) {

        return await new Notification(notification).save();
    }
}