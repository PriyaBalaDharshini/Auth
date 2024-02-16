// ForgotPassword.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ApiRoutes from '../utlis/ApiRoutes';
import { toast } from 'react-toastify';
import AxiosService from '../utlis/AxiosService';

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AxiosService.post(ApiRoutes.FORGOT_PASSWORD.path, { email });

            if (res.status === 200) {
                toast.success(res.data.message);
                alert("Password reset link sent to registered email address");
            }
        } catch (error) {
            console.error(error); 
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className='signin-wrapper'>
            <h4>Forgot password?</h4>
            <p>Enter email to reset password</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ForgotPassword;
