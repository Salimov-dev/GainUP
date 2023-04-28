export function getData(data, array) {
  if (array) {
    const newData = Object.keys(array).find((arr) => array[arr].name === data);
    return array[newData];
  }
  return data;
}
