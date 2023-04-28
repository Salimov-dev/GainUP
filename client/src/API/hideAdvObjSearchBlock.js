const hideAdvObjSearchBlock = true;

if (!localStorage.getItem("hideAdvObjSearchBlock")) {
  localStorage.setItem(
    "isHideAdvObjSearchBlock",
    JSON.stringify(hideAdvObjSearchBlock)
  );
}

export default hideAdvObjSearchBlock;
