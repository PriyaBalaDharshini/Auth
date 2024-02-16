import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
    let navigate = useNavigate()
    return (
        <div className='signin-wrapper text-center mt-5 py-5'>
            <h4>Welcome !</h4>
            <p style={{ marginTop: "20px" }}>Dont have account?</p>
            <Button variant="info" onClick={() => navigate("/signin")}>Signin</Button>
            <p style={{ marginTop: "20px" }}>Already Have account?</p>
            <Button variant="success" onClick={() => navigate("/login")}>Login</Button>
        </div>
    )
}

export default Home