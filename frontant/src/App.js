import React from 'react'
import '../src/App.css';
import Home from './compomant/Home';
import Create from './compomant/Create';
import Edit from './compomant/Edit';
import Read from './compomant/Read';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Other imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
        
      </Routes>
    </BrowserRouter>
  );
}


export default App

