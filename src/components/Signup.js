import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credential, setCredential] = useState({name: "", email: "", password: "", cpassword: ""});
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call 
        const {name, password, email} = credential;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Account created successfully", "success");
          } else{
            props.showAlert("invalid Details", "danger");
          }

    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2>Signup to continue with iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' minLength={5} required  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={5} required onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup