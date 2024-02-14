import express from 'express';
import userRoutes from "./user.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send(
        `<h1>Welcome to Authorisation and Authentication</h1>`
    )
})

router.use("/users", userRoutes)

export default router