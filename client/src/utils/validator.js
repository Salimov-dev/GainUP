export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        statusValidate = data?.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalSymbol = /[A-Z]+/g;
        statusValidate = !capitalSymbol.test(data);
        break;
      }
      case "isCirilicSymbol": {
        const cirilicSymbol = /[^a-zA-Z]+/g;
        statusValidate = !cirilicSymbol.test(data);
        break;
      }
      case "isNoDigitalSymbol": {
        const noDigitalSymbol = /\d+/g;
        statusValidate = noDigitalSymbol.test(data);
        break;
      }
      case "isDigitalSymbol": {
        const digitalSymbol = /\d+/g;
        statusValidate = !digitalSymbol.test(data);
        break;
      }

      case "maxLength": {
        statusValidate = data.length > config.value;
        break;
      }
      case "minLength": {
        statusValidate = data.length < config.value;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
