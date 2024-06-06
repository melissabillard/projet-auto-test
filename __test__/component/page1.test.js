import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Page1 from '../../src/markup/pages/page-1';
import axios from 'axios';

jest.mock('axios');

describe('Composant Page1', () => {
    const mockPokemonList = [
        { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'pokemon2', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ];
    const mockPokemonData1 = {
        name: 'pokemon1',
        types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Math, 'random').mockReturnValue(0);

        axios.get.mockImplementation((url) => {
            if (url === process.env.REACT_APP_API_URL) {
                return Promise.resolve({ data: { results: mockPokemonList } });
            } else if (url === 'https://pokeapi.co/api/v2/pokemon/1/') {
                return Promise.resolve({ data: mockPokemonData1 });
            }
            return Promise.reject(new Error('not found'));
        });
    });

    afterEach(() => {
        jest.spyOn(Math, 'random').mockRestore();
    });

    test('rendu et affiche les options Pokémon au chargement', async () => {
        render(
            <MemoryRouter>
                <Page1 />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('What type is pokemon1?')).toBeInTheDocument();
        });

        mockPokemonData1.types.forEach(type => {
            expect(screen.getByText(type.type.name)).toBeInTheDocument();
        });
    });
});
