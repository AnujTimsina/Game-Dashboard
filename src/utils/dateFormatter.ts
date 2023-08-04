export const dateFormatter = (timestamp: number) => {
  const dateFormat = new Date(timestamp);
  return (
    dateFormat.getDate() +
    '/' +
    (dateFormat.getMonth() + 1) +
    '/' +
    dateFormat.getFullYear() +
    ' ' +
    dateFormat.getHours() +
    ':' +
    dateFormat.getMinutes() +
    ':' +
    dateFormat.getSeconds()
  );
};
