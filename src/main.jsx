import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./dist/css/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from "react-router-dom"

document.addEventListener('DOMContentLoaded', () => {
  const homepage = document.querySelector('.homepage'); // Menggunakan elemen dengan kelas 'homepage' sebagai referensi
  const navbar = document.querySelector('.custom-navbar');

  if (homepage && navbar) {
    const homepageBackground = getComputedStyle(homepage).backgroundColor;
    navbar.style.backgroundColor = homepageBackground;
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
