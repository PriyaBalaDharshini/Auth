import userModel from "../model/user.js";
import sgMail from '@sendgrid/mail';
import Auth from '../helper/auth.js'

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
            if (password) {
                user.password = await Auth.createHash(password);
            }
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

const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await userModel.findById(req.user.id);

        if (user) {
            if (password) {
                user.password = await Auth.createHash(password);
                await user.save();

                return res.status(200).send({
                    message: "Password updated successfully",
                });
            } else {
                return res.status(400).send({
                    message: "Password is required",
                });
            }
        } else {
            return res.status(404).send({
                message: "User not found",
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

const sendPasswordResetMail = async (email) => {
    try {
        // Finding user with mail
        let user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Generating token 
        const payload = { email: user.email }; // Payload for the token
        const token = await Auth.createToken(payload); // Generate token using the payload

        // Saving the token and time to expiry
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Composing mail with password reset link
        const resetLink = `${process.env.WEB_URL}/reset-password?token=${token}`;
        const msg = {
            to: email,
            from: "priyaarasu12@gmail.com",
            subject: "Password Reset",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
        };

        // Sending mail
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send(msg);
        console.log('Password reset email sent');

    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error; // Throw the error to be caught by the error handling middleware
    }
}

export default {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    editUserById,
    logIn,
    updatePassword,
    sendPasswordResetMail
}