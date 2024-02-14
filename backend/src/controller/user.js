import userModel from "../model/user.js";
import Auth from "../helper/auth.js"


/* adding user */
const addUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = await Auth.createHash(req.body.password);
            let newUser = await userModel.create(req.body);
            console.log(newUser);
            res.status(200).send({
                message: "User Added Successfully!",
            });
        } else {
            res.status(401).send({
                message: `User already exists with ${req.body.email}`
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* For getting all the users */
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            message: "All users fetched Successfully",
            users
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* For getting a user by  id */
const getUserById = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        res.status(200).send({
            message: `User fetched with the id ${req.params.id}`,
            user
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* Deleting a user by  id */
const deleteUserById = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        if (user) {
            await userModel.deleteOne({ _id: req.params.id })
            res.status(200).send({
                message: "Data Deleted successfully"
            });
        }
        else {
            res.status(400).send({
                message: "Invalid id"
            });
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
}

/* Updating a user by id */
const editUserById = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        const user = await userModel.findOne({ _id: req.params.id });
        if (user) {
            user.name = name;
            user.phone = phone;
            user.email = email;
            user.password = password;

            await user.save()

            res.status(200).send({
                message: `User edited with the id ${req.params.id}`,

            })
        } else {
            res.status(404).send({
                message: `User with id ${req.params.id} not found`,
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* logging in using email  and password a user by  id */
const logIn = async (req, res) => {

    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email: email });
        /* hasing the password and comparing it */
        if (user) {
            const passwordMatch = await Auth.hashCompare(password, user.password)
            if (passwordMatch) {
                const token = await Auth.createToken({
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
                res.status(200).send({
                    message: "Login successful",
                    token
                })
            } else {
                res.status(400).send({
                    message: "Incorrect Password"
                })
            }
        }
        else {
            res.status(400).send({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}


export default {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    editUserById,
    logIn
}