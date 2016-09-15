let colorIndex = 0;
const COLOR = [
  "default",
  "primary",
  "success",
  "info",
  "warning",
  "danger",
]

let userColorHash = {};

export default function getUserColor(user) {
  let color = userColorHash[user];
  if (!color) {
    const index = colorIndex % COLOR.length;
    color = COLOR[index];
    userColorHash[user] = color;
    colorIndex += 1;
  }

  return color;
}
