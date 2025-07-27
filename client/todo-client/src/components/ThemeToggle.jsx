import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className="position-absolute top-0 end-0 mt-3 me-3 d-flex align-items-center"
      style={{ cursor: "pointer", userSelect: "none" }}
      onClick={toggleTheme}
    >
      {darkMode ? (
        <>
          <i className="bi bi-sun fs-3 me-2"></i>
        </>
      ) : (
        <>
          <i className="bi bi-moon fs-3 me-2"></i>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
