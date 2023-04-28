const darkMode = "light";

if (
  !localStorage.getItem("darkMode") ||
  localStorage.getItem("darkMode") === undefined
) {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("darkMode")));
    }, 200);
  });

export default {
  fetchAll,
};

// export default darkMode;
