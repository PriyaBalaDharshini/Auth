import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from './src/utlis/AxiosService';
import ApiRoutes from './src/utlis/ApiRoutes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState("")
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            let res = await AxiosService.put(ApiRoutes.RESET_PASSWORD.path, { password }) // Using the correct path from ApiRoutes
            if (res.status == 200) {
                toast.success(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message) || (error.message)
        }
    }

    return (
        <div className='signin-wrapper'>
            <h4>Password Updating Page</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ResetPassword