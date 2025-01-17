import Router from 'express';
import { authLogin, authRegister } from '../controllers/auth-controller.js';

const router = Router();

router.route("/register").post(authRegister)
router.route("/login").post(authLogin);

export default router;