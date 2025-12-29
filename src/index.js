import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/reset.css";
import  Layout  from './components/Layout.js';
import { AuthProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
   <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
