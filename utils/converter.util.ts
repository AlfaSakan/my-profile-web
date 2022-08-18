export const convertNumberToTime = (num: number) => {
  const date = new Date(num);
  const minute =
    date.getMinutes().toString().length === 2
      ? `${date.getMinutes()}`
      : `0${date.getMinutes()}`;
  const hour =
    date.getHours().toString().length === 2
      ? `${date.getHours()}`
      : `0${date.getHours()}`;

  return `${hour}:${minute}`;
};
