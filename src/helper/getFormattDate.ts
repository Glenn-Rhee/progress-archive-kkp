export const getFormattDate = (date: string) => {
  const dateLink = new Date(date);

  const day = String(dateLink.getDate()).padStart(2, "0"); // 2 digit tanggal
  const month = String(dateLink.getMonth() + 1).padStart(2, "0"); // 2 digit bulan (ingat getMonth mulai dari 0)
  const year = dateLink.getFullYear(); // 4 digit tahun

  return `${day}/${month}/${year}`;
};
