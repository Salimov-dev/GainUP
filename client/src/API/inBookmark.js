const inBookmark = false;

if (!localStorage.getItem("inBookmark")) {
  localStorage.setItem("inBookmark", JSON.stringify(inBookmark));
}

export default inBookmark;
