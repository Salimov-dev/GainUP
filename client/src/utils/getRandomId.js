export function getRandomId() {
  return String(Math.ceil(Date.now() * Math.random()));
}
