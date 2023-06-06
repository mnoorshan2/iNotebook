import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../index.css";


const Login = (props) => {
    const [credential, setCredential] = useState({email:"", password:""});
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('shan')
        // API Call 
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credential.email, password: credential.password}),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Login successfully", "success");
          } else{
            props.showAlert("invalid credentials", "danger");
          }

    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }

    return (
        <div className='noor mt-3'>
            <h2 className='heading'>Login to continue with iNotebook</h2>
            <form className='shan' onClick={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credential.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} onChange={onChange} name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default Login