import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  const isLoggedIn = location.pathname === '/' ? false : true;

  return (
    <div className="App">
      {headerPaths.includes(location.pathname) ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : (
        ''
      )}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-movies" element={<Movies save={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {footerPaths.includes(location.pathname) ? <Footer /> : ''}
    </div>
  );
}

export default App;
