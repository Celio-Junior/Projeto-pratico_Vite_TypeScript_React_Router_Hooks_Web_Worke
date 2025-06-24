export const formatDate = (date: number) => {
  const data = new Date(date);
  return data
    .toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
    .replace(',', ' ás');
};
