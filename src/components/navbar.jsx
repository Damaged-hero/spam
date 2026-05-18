import { useState } from 'react';
import { NavLink } from 'react-router-dom';


function Navbar({ darkMode, setDarkMode }) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <nav className="flex h-16 items-center bg-white px-6 shadow-sm dark:bg-gray-900">

            {/* logo on the left hand side */}
            <div className="flex-1">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                    SPAM!!!!!!!!!
                </div>
            </div>

            {/* Centerelized navbar */}
            <ul className="m-0 flex flex-1 list-none justify-center gap-6 p-0">
                <li>
                    <NavLink to="/" className={({ isActive }) => `text-lg no-underline px-3 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-500 bg-gray-100 dark:bg-gray-700'  : 'text-gray-800 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700' }` } >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shop" className={({ isActive }) => `text-lg no-underline px-3 py-1 rounded transition-colors duration-200 ${isActive? 'text-blue-500 bg-gray-100 dark:bg-gray-700' : 'text-gray-800 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                        Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about"className={({ isActive }) => `text-lg no-underline px-3 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-500 bg-gray-100 dark:bg-gray-700': 'text-gray-800 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700' }`} >
                        About
                    </NavLink>
                </li>
            </ul>

            {/*others to the right */}
            <div className="relative flex flex-1 justify-end">
                <button onclick={() => alert('Cart clicked!')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border-none bg-transparent cursor-pointer">
                    🛒 Cart
                </button>

                <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border-none bg-transparent cursor-pointer">
                    ⚙️ Settings
                    <span className={`text-xs transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
                <button onClick={() => alert('Profile clicked!')} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border-none bg-transparent cursor-pointer">
                    👤 Profile
                </button>

                {/* Dropdown */}
                {settingsOpen && (
                    <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">

                        {/* Dark mode toggle row */}
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-gray-700 dark:text-gray-200">
                                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                            </span>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-300 border-none cursor-pointer
                  ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300
                    ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>

                    </div>
                )}
            </div>

        </nav>
    );
}

export default Navbar;