import express from 'express'
import userController from '../controller/user.js'
/* import Auth from "../helper/auth.js" */


const router = express.Router()

router.post("/addUser", /* Auth.authenticate,  */userController.addUser);
router.post("/login", userController.logIn);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUserById);

router.put("/:id", userController.editUserById);



export default router