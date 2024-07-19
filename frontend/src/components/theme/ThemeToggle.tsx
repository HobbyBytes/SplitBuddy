import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import classes from "./ThemeToggle.module.css";
import { getDefaultTheme, setThemeLocal } from "../../utils/themeLocalStorage";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(getDefaultTheme());

  useEffect(() => {
    if (isDark === "dark") {
      //   document.body.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      //   document.body.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    if (isDark !== null) {
      setThemeLocal(isDark);
    }
  }, [isDark]);

  return (
    <div>
      {isDark === "dark" ? (
        <HiSun
          title="Change to light mode"
          onClick={() => setIsDark("light")}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 ${classes.fadeInSun}`}
        />
      ) : (
        <HiMoon
          title="Change to dark mode"
          onClick={() => setIsDark("dark")}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 ${classes.fadeInMoon}`}
        />
      )}
    </div>
  );
}

export default ThemeToggle;
