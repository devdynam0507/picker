import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import Home from './pages/home';
import Category from './pages/category';

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
