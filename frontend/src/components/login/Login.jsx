import React from "react";
import { Link } from 'react-router-dom'
import './Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    var baseurl = 'http://localhost:8080/user/login'
    const navigate = useNavigate();

    const [form, setformdata] = React.useState({
        emailId: '',
        password: '',
    });
    const handleForm = e => {
        let name = e.target.name;
        let val = e.target.value;
        setformdata({ ...form, [name]: val })
    }
    const login = () => {
        axios.post(baseurl, {
            emailId: form.emailId,
            password: form.password
        }).then(res => {
            sessionStorage.setItem('userLoggedIn', form.emailId)
            sessionStorage.setItem('token', res.data.token)
            navigate('/home')
        }).catch(err => alert(err.response.data.message))
    }
    return (
        <div className="login-body">
            <h1>Research Paper Collaboration Tool</h1>
            <div className="login-container">

                <div className="image-container">
                    <img id="login-image" src="login.svg" alt="" />
                </div>
                <div className="form-container">
                    <div className="form-1">
                        <h1>Login</h1>
                        <form>
                            <div className="text-box">
                                <input type="email" name="emailId" id="emailId" value={form.emailId} placeholder="Email Address" onChange={handleForm} required />
                            </div>
                            <div className="text-box">
                                <input type="password" name="password" id="password" value={form.password} placeholder="Password" onChange={handleForm} required />
                            </div>

                            <button type="button" className="btn3" onClick={login}>Login</button>
                        </form>
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                            <button type="button" className="btn3">Register</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;