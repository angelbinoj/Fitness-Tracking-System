import { useState, useEffect } from "react";
import { setTheme } from "../utils/theme";
import { IoMoonSharp, IoSunny } from "react-icons/io5";

function ThemeToggle({ className = "" }) {
  const [theme, setLocalTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setLocalTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-2
        p-2 rounded-md text-sm font-medium
        bg-green-600 text-white
        transition-all duration-200
        ${className}
      `}
    >
      {theme === "light" ? (
        <>
          <IoMoonSharp className="text-yellow-300 text-lg" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <IoSunny className="text-yellow-400 text-lg" />
          <span>Light</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
