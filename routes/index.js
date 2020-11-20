import { Router } from 'express';
var router = Router();

router.get('/', async function(req, res) {
  res.json("AWESOME!");
});

export default router;
