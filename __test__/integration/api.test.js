// Packages
const axios = require('axios');
require('dotenv').config();

const apiUrl = process.env.REACT_APP_API_URL

// TEST API
describe('Test de l\'API PokeAPI', () => {
    test('Test API 200', async () => {
      try {
        const response = await axios.get(`${apiUrl}1/`);
        expect(response.status).toBe(200);
      } catch (error) {
        throw new Error('L\'API a retourné une erreur');
      }
    });
    test('Test API 404', async () => {
      try {
        const response = await axios.get(`${apiUrl}100000/`);
        throw new Error('L\'API n\'a pas retourné une erreur 404');
      } catch (error) {
        // On s'attend à ce que l'erreur soit déclenchée
        expect(error.response.status).toBe(404);
        // On s'attend à ce que la réponse ait un message "Not Found"
        expect(error.response.data).toEqual('Not Found');
      }
    });
  
    test('Récupération des données d\'un Pokémon', async () => {
      const response = await axios.get(`${apiUrl}1/`);
  
      expect(response.status).toBe(200);
  
      const pokemonData = response.data;
  
      expect(pokemonData).toHaveProperty('name');
      expect(pokemonData).toHaveProperty('types');
      expect(pokemonData).toHaveProperty('abilities');
    });
  });
  