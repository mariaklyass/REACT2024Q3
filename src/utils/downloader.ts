import { Character } from 'src/lib/types';

const downloadCsv = (characters: Character[]) => {
  const headers = 'ID,Name,Status,Species,Gender,Origin,Location\n';
  const rows = characters
    .map(
      character =>
        `${character.id},${character.name},${character.status},${character.species},${character.gender},${character.origin?.name},${character.location?.name}`
    )
    .join('\n');

  const csvContent = `${headers}${rows}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};

export default downloadCsv;
