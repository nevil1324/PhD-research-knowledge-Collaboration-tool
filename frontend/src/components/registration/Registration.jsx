import React from "react";
import { Link } from 'react-router-dom'
import './Registration.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const baseurl = 'http://localhost:8080/user'

const Registration = () => {
    let navigate = useNavigate();
    const [form, setformdata] = React.useState({
        name: '',
        emailId: '',
        password: '',
        conf_password: ''
    });
    const handleForm = e => {
        let name = e.target.name;
        let val = e.target.value;
        setformdata({ ...form, [name]: val })
    }

    const register = () => {
        if (form.password !== form.conf_password) {
            alert("Passwords does not match");
        }
        else {
            axios.post(baseurl, {
                name: form.name,
                emailId: form.emailId,
                password: form.password
            }).then(response => {
                navigate('/login');
            })
                .catch(err => alert(err.response.data.message));
        }
    }

    return (
        <div className="register-body">
            <h1>Research Paper Collaboration Tool</h1>
            <div className="register-container">

                <div className="image-container">
                    <img id="register-image" src="signup.svg" alt="te" />
                </div>
                <div className="form-container">
                    <div className="form-1">
                        <h1>Register</h1>
                        <form>
                            <div className="text-box"><input type="text" name="name" id="name" value={form.name} placeholder="Name" onChange={handleForm} required /></div>
                            <div className="text-box"><input type="email" name="emailId" id="emailId" value={form.emailId} placeholder="Email Address" onChange={handleForm} required /></div>
                            <div className="text-box"><input type="password" name="password" id="password" value={form.password} placeholder="Password" onChange={handleForm} required /></div>
                            <div className="text-box"><input type="password" name="conf_password" id="conf_password" value={form.conf_password} placeholder="Confirm Password" onChange={handleForm} required /></div>

                            <button type="button" className="btn2" onClick={register}>Register</button>
                        </form>
                        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                            <button type="button" className="btn2">Login</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Registration;