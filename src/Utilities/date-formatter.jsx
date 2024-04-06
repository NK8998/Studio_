export const DateFormatter = (timestamp) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", options);
};
