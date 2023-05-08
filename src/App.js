import './App.css';
import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterForm from './Pages/RegisterPage/RegisterPage';
import MainPage from './Pages/MainPage/MainPage'; 
import MovieSearch from './Pages/SearchPage/SearchPage'
import MyNavbar from './Coponents/Navbar/Navbar'
import MyNavbar2 from './Coponents/Navbar/Navbar2'
import MovieDetails from './Pages/MovieDetailPage/MovieDetailPage'
import PersonDetails from './Pages/PersonalPage/PersonalPage';

function App() {
  
  
  return (
    
    <div>
      
      <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/movie' element={<MainPage/>}/>
        <Route path="/movies/details/:imdbID" element={<MovieDetails/>}/>
        <Route path="/people/id/:id" element={<PersonDetails/>}/>
        <Route path="/signup" element={<RegisterForm/>}/>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
