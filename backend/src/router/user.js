import express from 'express';
import userController from '../controller/user.js';

const router = express.Router();

router.post("/addUser", userController.addUser);
router.post("/login", userController.logIn);

router.post("/forgotpassword", userController.sendPasswordResetMail);
router.put("/updatepassword", userController.updatePassword);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUserById);

router.put("/:id", userController.editUserById);

export default router;
