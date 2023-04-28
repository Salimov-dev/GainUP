import React, { useRef } from "react";
import "./styles.css";

const ScrollToTop = () => {
  const btnRef = useRef(null);
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  window.onscroll = () => {
    if (window.scrollY > 100) {
      btnRef.current.classList.remove("scrollToTopBtn__hide");
      btnRef.current.classList.add("scrollToTopBtn__show");
    } else if (window.scrollY < 100) {
      btnRef.current.classList.add("scrollToTopBtn__hide");
      btnRef.current.classList.remove("scrollToTopBtn__show");
    }
  };
  return (
    <button
      ref={btnRef}
      className="scrollToTop__container scrollToTopBtn__show scrollToTopBtn__hide"
      onClick={handleScrollToTop}
    >
      <i className="bi bi-arrow-up-circle scrollToTopBtn__resize"></i>
    </button>
  );
};

export default ScrollToTop;
