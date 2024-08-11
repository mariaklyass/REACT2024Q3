import { delay, http, HttpResponse } from 'msw';
import { mockCharacters, mockCharacterDetails } from '../../utils/mocks';

const handlers = [
  http.get('https://rickandmortyapi.com/api/character', () =>
    HttpResponse.json({
      info: {
        count: mockCharacters.length,
        pages: 1,
        next: null,
        prev: null,
      },
      results: mockCharacters,
    })
  ),

  http.get('https://rickandmortyapi.com/api/character/1', async () => {
    await delay();
    return HttpResponse.json(mockCharacterDetails);
  }),

  http.get('https://rickandmortyapi.com/api/character/:id', req => {
    const { id } = req.params;
    const character = mockCharacters.find(char => char.id === id);
    if (character) {
      return HttpResponse.json(character);
    }
    throw new Error();
  }),
];

export default handlers;
