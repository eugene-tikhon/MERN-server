import express from 'express';
import { register, login, updateUser } from '../controllers/auth.js';  
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.post('/login', login);
router.patch('/updateUser', auth, updateUser);

export default router;





