import React from "react";
import {useNavigate } from "react-router-dom";
import "./Navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutBt from './../Logout'

export default function MyNavbar2({ isLoggedIn, onLogout })
{
  
  
    return(
        
        <Navbar bg="dark" variant="dark">
            
        <Container>
        <Navbar.Brand href="#home">Henry's web</Navbar.Brand>
          <Nav className="me-auto">
          {isLoggedIn && ( <LogoutBt/>)}
          </Nav>
        </Container>
      </Navbar>
        
    )
}