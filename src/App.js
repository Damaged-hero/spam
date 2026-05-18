import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

// App.js
function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<div className="p-6 dark:text-white">Shop Page</div>} />
                    <Route path="/about" element={<div className="p-6 dark:text-white">About Page</div>} />
                </Routes>
            </div>
        </div>
    );
} 

export default App;