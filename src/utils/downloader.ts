import { Character } from './types';

const downloadCsv = (characters: Character[]) => {
  const headers = 'ID,Name,Status,Species\n';
  const rows = characters
    .map(
      character =>
        `${character.id},${character.name},${character.status},${character.species}`
    )
    .join('\n');

  const csvContent = `${headers}${rows}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};

export default downloadCsv;
