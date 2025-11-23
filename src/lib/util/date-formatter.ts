const formatDate = (input: string | Date): string => {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) return "";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}.${m}.${d}`;
};

export default formatDate;
