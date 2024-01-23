import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/user.controller.js';

router.get('/current', UserController.getCurrentUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// router.get('/create', (req, res) => {
//     res.render('user/create');
// });
router.post('/create', UserController.createUser);

export default router;
