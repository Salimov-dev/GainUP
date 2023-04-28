const QuantityMeetingsOnPage = 5;

if (!localStorage.getItem("QuantityMeetingsOnPage")) {
  localStorage.setItem(
    "QuantityMeetingsOnPage",
    JSON.stringify(QuantityMeetingsOnPage)
  );
}
export default QuantityMeetingsOnPage;
