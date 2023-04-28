export const handleKeyDown = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const form = event.target.form;
    const indexField = Array.prototype.indexOf.call(form, event.target);
    form.elements[indexField + 1].focus();
  }
};
