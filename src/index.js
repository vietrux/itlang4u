import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import 'flowbite';

//template
import NavBar from './components/NavBar';

//pages
import Home from './components/Home';
import Article from './components/Article';
import Login from './components/Auth/Login';
import Admin from './components/Auth/Admin';
import Create from './components/Auth/Create';
import Update from './components/Auth/Update';
import NoPage from './components/NoPage';


//config body
document.body.classList.add("dark:bg-gray-900")
document.body.classList.add("dark:text-white")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/article/:id" element={<Article />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/admin/create" element={<Create />} />
    <Route path="/admin/update/:id" element={<Update />} />
    <Route path="*" element={<NoPage />} />
  </Routes>
</BrowserRouter>
);
