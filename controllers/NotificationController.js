
export default class NotificationController {

    /**
     * @param NotificationService
     */
    constructor(NotificationService) {
        this.notificationService = NotificationService;
    }

    /**
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create(req, res) {
        await this.notificationService.handle(req.body);

        return res.json("Notification Created!");
    }
}