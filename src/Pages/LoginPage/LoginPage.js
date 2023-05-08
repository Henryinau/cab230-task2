import './LoginPage.css'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const login = (email, password, onSuccess, onError) => {
    const API_URL = 'http://sefdb02.qut.edu.au:3000';
    const url = `${API_URL}/user/login`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error('Invalid login request');
      } else if (res.status === 401) {
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      } else {
        throw new Error('Unknown error');
      }
    })
      .then((data) => {
        //output bearerToken and refreshToken
        console.log('Bearer token:', data.bearerToken);
        console.log('Refresh token:', data.refreshToken);

        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('token', data.bearerToken.token);
        onSuccess();
      })
      .catch((error) => onError(error.message));
  };

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(
        email,
        password,
        () => {
        //the process of login succeed
            console.log('Login successful!');
          
            navigate('/movie')},
        (errorMessage) => {
        // login failed
         setError(errorMessage)
        }
    );
  
  };

  return (
    
    <div className="loginContainer">
     
      <h1 className="title">Welcome to Movie World</h1>
      <p className="describe">This app is design for the people who want to browser movies</p>
      <form className="loginform" onSubmit={handleSubmit}>
        
        <label className="login-label1"> Email:</label>
        <input className="login-input1"type="text" value={email} onChange={handleEmailChange} />
        <br />

        <label className="login-label2"> PassWord:</label>
        <input
            className="login-input2"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        <br />
        <button className= "login-button"type="login" > Log in </button>

      </form>
      <p className="link-login">
        <Link to="/signup" className="link-login">
          Don't have an account?
        </Link>
      </p>
      
    </div>
  );
}