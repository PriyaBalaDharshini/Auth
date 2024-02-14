import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../utlis/AxiosService';
import ApiRoutes from '../utlis/ApiRoutes';

function Signin() {
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData)
            const { name, email, phone, password } = formProps;

            /* console.log(formProps); */

            let res = await AxiosService.post(ApiRoutes.SIGN_IN.path, { name, email, phone, password }, {
                authenticate: ApiRoutes.SIGN_IN.authenticate,
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                sessionStorage.setItem('token', res.data.token)
                navigate("/dashboard")
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }


    return (
        <div className='signin-wrapper'>
            <h4>Signin to Continue</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Enter phone number" name='phone' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='form-para'>Already Have Accout? <a href="/login">Login</a> to continue</p>
        </div>
    )
}

export default Signin