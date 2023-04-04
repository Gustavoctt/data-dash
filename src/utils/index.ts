export const normalizeDateToLocale = (date: string) => {
  const parsedDate = new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
  });

  const [normalizedDate, time] = parsedDate.split(" ");

  const normalizedTime = time.substring(0, 5);

  return `${normalizedDate} às ${normalizedTime}`;
};
