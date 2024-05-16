const { render, screen } = require('@testing-library/react'); // utiliser CommonJS plutôt que les imports ECMAScript
const sum = require('./sum');
const axios = require('axios');

// COMPONENT
// const MyHomePage = require('../src/markup/pages/home/index.jsx');

//*** TOUJOURS VÉRIFIER QUE SON TEST ÉCHOUE ! ***//

// TEST API
describe('Test de l\'API PokeAPI', () => {
  test('Test API 200', async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
      expect(response.status).toBe(200);
    } catch (error) {
      throw new Error('L\'API a retourné une erreur');
    }
  });
  test('Test API 404', async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/10000');
      throw new Error('L\'API n\'a pas retourné une erreur 404');
    } catch (error) {
      // On s'attend à ce que l'erreur soit déclenchée
      expect(error.response.status).toBe(404);
      // On s'attend à ce que la réponse ait un message "Not Found"
      expect(error.response.data).toEqual( 'Not Found');
    }
  });
  
  test('Récupération des données d\'un Pokémon', async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1');

    expect(response.status).toBe(200);

    const pokemonData = response.data;

    expect(pokemonData).toHaveProperty('name');
    expect(pokemonData).toHaveProperty('types');
    expect(pokemonData).toHaveProperty('abilities');
  });
});

// TEST UNITAIRE exemple
// Ex : à jeter ...
describe(
  'Test somme', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    test('test -1 + -2 = -3', () => {
      expect(sum(-1, -2)).toBe(-3);
    });
    test('le résultat possède 5 caractères', () => {
      expect("hello".length).toEqual(5)
    });
    // Exemple test qui dois retourner faux !
    // test('test -1 + -2 = -4', () => {
    //   expect(sum(-1, -2)).toBe(-4);
    // })
  }
)

// TEST GRAPHIQUE exemple
// Nous allons simuler le rendu de notre composant React

describe(
  'Test nbr caractères', () => {
    test('le résultat possède 5 caractères', () => {
      expect("hello".length).toEqual(5)
    });
  }
)