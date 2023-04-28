const QuantityObjectsOnPage = 5;

if (!localStorage.getItem("QuantityObjectsOnPage")) {
  localStorage.setItem(
    "QuantityObjectsOnPage",
    JSON.stringify(QuantityObjectsOnPage)
  );
}
export default QuantityObjectsOnPage;
