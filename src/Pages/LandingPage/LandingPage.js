import Button from 'react-bootstrap/Button';
import {Link, useNavigate } from "react-router-dom";
import './LandingPage.css'


export default function LandingPage()
{
     const navigate = useNavigate();
    const handleClick = () =>{
       navigate('/login');
    }
    return(
        <div className='LandingPageContainer'>
           
     
            
            <h1 className='title-landing'>Welcom to my app</h1>
            
           <Button className="landingpage-button" onClick={handleClick}  type="submit">start now</Button>{''}
          
            
        </div>
        
    )
}