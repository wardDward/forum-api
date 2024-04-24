import { fetchNotification } from "../controllers/notificationController.js"
import express from "express"
import validateToken from "../middleware/validateToken.js";

const router = express.Router()

router.use(validateToken);
router.get('/', fetchNotification)


export default router
