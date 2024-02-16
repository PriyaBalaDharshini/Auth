import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from '../utlis/AxiosService';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Move useNavigate inside the functional component

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AxiosService.put("/updatepassword", { password });
            if (res.status === 200) {
                toast.success("Password updated successfully");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className="signin-wrapper">
            <h4>Update Password</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Password
                </Button>
            </Form>
        </div>
    );
};

export default UpdatePassword
