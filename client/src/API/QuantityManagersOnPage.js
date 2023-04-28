const QuantityManagersOnPage = 5;

if (!localStorage.getItem("QuantityManagersOnPage")) {
  localStorage.setItem(
    "QuantityManagersOnPage",
    JSON.stringify(QuantityManagersOnPage)
  );
}
export default QuantityManagersOnPage;
