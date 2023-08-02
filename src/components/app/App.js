import React from 'react';
// import logo from './logo.svg';
import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
