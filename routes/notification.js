import { Router } from 'express';
import _NotificationController from '../controllers/NotificationController';
import NotificationService from '../services/NotificationService';

var router = Router();
var NotificationController = new _NotificationController(new NotificationService());

router.post('/', function(req, res) {
    NotificationController.create(req, res);
});

export default router;
