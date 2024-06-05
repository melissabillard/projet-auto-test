const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const apiUrl = process.env.REACT_APP_API_URL

// API integration test with mock
describe('PokeAPI Integration Tests', () => {

    beforeEach(() => {
      mock.reset();
    });
  
    test('fetches Pokémon data successfully', async () => {
      const mockData = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'bulbasaur.png' },
        stats: [
          { stat: { name: 'attack' }, base_stat: 49 },
          { stat: { name: 'defense' }, base_stat: 49 },
        ],
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } }
        ],
        moves: [
          { move: { name: 'tackle', url: 'https://pokeapi.co/api/v2/move/1/' }, power: 40 },
          { move: { name: 'vine whip', url: 'https://pokeapi.co/api/v2/move/2/' }, power: 45 },
          { move: { name: 'razor leaf', url: 'https://pokeapi.co/api/v2/move/3/' }, power: 55 },
          { move: { name: 'solar beam', url: 'https://pokeapi.co/api/v2/move/4/' }, power: 120 }
        ],
      };
  
      mock.onGet(`${apiUrl}1`).reply(200, mockData);
  
      const response = await axios.get(`${apiUrl}1`);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockData);
    });
  
    test('handles 404 error', async () => {
      mock.onGet(`${apiUrl}10000`).reply(404);
  
      try {
        await axios.get(`${apiUrl}10000`);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  
    test('retrieves Pokémon data structure correctly', async () => {
      const mockData = {
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }]
      };
  
      mock.onGet(`${apiUrl}1`).reply(200, mockData);
  
      const response = await axios.get(`${apiUrl}1`);
      expect(response.status).toBe(200);
  
      const pokemonData = response.data;
      expect(pokemonData).toHaveProperty('name');
      expect(pokemonData).toHaveProperty('types');
      expect(pokemonData).toHaveProperty('abilities');
    });
  });