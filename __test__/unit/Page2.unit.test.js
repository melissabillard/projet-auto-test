import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Page2 from '../../src/markup/pages/page-2/index'; 


describe('Page2 Component', () => {
    const mock = new MockAdapter(axios);

    beforeEach(() => {
        mock.resetHistory();
    });

    const mockPokemons = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `Pokemon ${index + 1}`,
        sprites: { front_default: `pokemon${index + 1}.png` },
      }));

      mock.onGet(new RegExp(`${process.env.REACT_APP_API_URL}\\d+`)).reply(200, {});
  
      mockPokemons.forEach(pokemon => {
        mock.onGet(`${process.env.REACT_APP_API_URL}${pokemon.id}`).reply(200, pokemon);
      });

    test('fetches Pokémon options on load', async () => {
        render(<Page2 />);
    
        await waitFor(() => expect(mock.history.get.length).toBeGreaterThan(0));

        mockPokemons.forEach(async pokemon => {
          const pokemonElement = await screen.findByText(new RegExp(pokemon.name, 'i'));
          expect(pokemonElement).toBeInTheDocument();
        });

        const pageTitle = await screen.findByText(/Pokémon Battle Simulator/i);
        expect(pageTitle).toBeInTheDocument();
      });
});