import Router from 'express';
import { authLogin, authLogout, authRegister, authUpdate, checkUser } from '../controllers/auth-controller.js';
import { checkAuth } from '../middlwares/auth-middleware.js';

const router = Router();

router.route("/register").post(authRegister)
router.route("/login").post(authLogin);
router.route("/update/:id").post(authUpdate)
router.route("/logout").post(authLogout)
router.route("/check-auth").get(checkAuth, checkUser)

export default router;