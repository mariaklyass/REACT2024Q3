import { describe, it, expect, vi } from 'vitest';
import downloadCsv from './downloader';
import { Character } from './types';
import { mockResults } from './constants';

const mockCreateObjectURL = vi.fn();
vi.stubGlobal('URL', { createObjectURL: mockCreateObjectURL });

describe('downloadCsv', () => {
  it('should generate a correct CSV from character data', () => {
    const characters: Character[] = mockResults;
    const mockBlob = new Blob(
      [
        'ID,Name,Status,Species\n1,Rick Sanchez,Alive,Human\n2,Morty Smith,Alive,Human',
      ],
      { type: 'text/csv;charset=utf-8;' }
    );
    mockCreateObjectURL.mockReturnValue('mocked-url');

    const csvUrl = downloadCsv(characters);

    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(csvUrl).toBe('mocked-url');
  });
});
