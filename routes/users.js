import { Router } from 'express';
import User from "../models/User";
var router = Router();

/* GET users listing. */
router.get('/', async function(req, res) {
	await User.find({}, async (error, users) => {
		return res.json(users);
	});
});

export default router;
