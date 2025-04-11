import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import './index.css'; // Import your global CSS styles (if you have any)
import App from './App'; // Import the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
