import { useSelector } from "react-redux";
import { getObjectsList } from "../../../../store/objects.store";

const QuantityOfObjects = ({ id }) => {
  const objects = useSelector(getObjectsList());
  const quantity = objects.filter((obj) => obj.userId === id);
  return quantity.length;
};

export default QuantityOfObjects;
