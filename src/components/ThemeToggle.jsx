function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black dark:bg-yellow-400 text-white dark:text-black font-medium cursor-pointer border-none text-base transition-colors duration-300"
        >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    );
}

export default ThemeToggle;