import './RegisterPage.css'
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";



export default function RegisterForm()
{
  const API_URL = 'http://sefdb02.qut.edu.au:3000';

  const navigate = useNavigate();
  const[email, setUsername]=useState('');
  const[password, setPassword]=useState('');
  const[secondpassword, setSecondpassword]=useState('');
  const [error, setError] = useState(null);
  
  const handleUsernameChange = (event) => {setUsername(event.target.value)};
  const handlePasswordChange = (event) => {setPassword(event.target.value)};
  const handleSecondPasswordChange = (event) => {setSecondpassword(event.target.value)};

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${API_URL}/user/register`;
    if (password !== secondpassword) {
      setError('Password and confirm password do not match');
      alert('Password and confirm password do not match');
    return;
      
      
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 409) {
          throw new Error("User already exists");
        } else if (res.status === 400) {
          throw new Error("Bad request");
        } else if (res.status === 429) {
          throw new Error("Rate limit exceeded");
        } else {
          throw new Error("Unknown error");
        }
      })
      .then((data) => {console.log(data); navigate('/movie');})
      .catch((err) => {
        setError('Failed to register user');
        console.error('Error: ', err);
      });
  };

    return(
      <div className="signUpContainer">
       
      <form onSubmit={handleSubmit}>
        <h2 className="title-signup">Register</h2>
        <label className="signup-label1">
          email:
        </label>
        <input className="signup-input1" type ="text" value = {email} onChange = {handleUsernameChange} />
        

        <label className="signup-label2">
          PassWord:
        </label>
        <input  className="signup-input2" type="password" value = {password} onChange={handlePasswordChange}/>

        <label className="signup-label3">
        <span className="label-text">SecondPassword:</span>
        </label>
       <input className="signup-input3" type="password" value = {secondpassword} onChange={handleSecondPasswordChange}/>

    <button className="signup-button"type = "Register"> Register</button>
        
      </form>
      <p>
      <Link to="/login" className="link-signup">Already have a account?</Link>
      </p>
      </div>
       
        
    )
}