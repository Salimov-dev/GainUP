import dayjs from "dayjs";

const Date = ({ date }) => {
  if (date === "") {
    return "-";
  } else {
    return dayjs(date).format("DD.MM.YYYY");
  }
};

export default Date;
