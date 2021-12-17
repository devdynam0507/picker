import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path=':category' element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
