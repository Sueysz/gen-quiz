import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'

import './index.css'
import { AuthProvider } from './utils/AuthProvider.jsx';
import { Link } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <footer><Link to={'/CGU'}>CGU(Condition général d'utilisation)</Link></footer>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
