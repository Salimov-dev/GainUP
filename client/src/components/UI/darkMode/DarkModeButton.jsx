import React, { useEffect } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import detectDarkMode from "../../../utils/detectDarkMode";
import "./style.css";
import sun from "./sun.svg";
import moon from "./moon.svg";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", detectDarkMode);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => {
      return prevState === "light" ? "dark" : "light";
    });
  };

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
      if (document.querySelector("table"))
        return document.querySelector("table").classList.add("table-dark");
    } else {
      document.body.classList.remove("dark");
      if (document.querySelector("table"))
        return document.querySelector("table").classList.remove("table-dark");
    }
  }, [darkMode]);

  const buttonRegular = "dark-mode-btn";
  const buttonActive = "dark-mode-btn dark-mode-btn--active";

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";
        setDarkMode(newColorScheme);
      });
  }, []);

  return (
    <button
      className={darkMode === "dark" ? buttonActive : buttonRegular}
      onClick={toggleDarkMode}
    >
      <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
      <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
    </button>
  );
};

export default DarkModeButton;
