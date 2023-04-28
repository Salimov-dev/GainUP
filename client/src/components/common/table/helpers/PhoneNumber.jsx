import { phoneFormat } from "../../../../utils/phoneFormat";

const PhoneNumber = ({ number }) => {
  const editedNumber = phoneFormat(number && number);
  return number ? <div className="text-nowrap padding">{editedNumber}</div> : "Отсутствует"
};

export default PhoneNumber;
