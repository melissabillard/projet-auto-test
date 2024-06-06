import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Page1 from '../../src/markup/pages/page-1'; 


jest.mock('axios');

const mockPokemonList = [
    { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'pokemon2', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

const mockPokemonData1 = {
    name: 'pokemon1',
    types: [
        { type: { name: 'type1' } },
        { type: { name: 'type2' } }
    ],
    sprites: { front_default: 'url1' },
};

const mockPokemonData2 = {
    name: 'pokemon2',
    types: [
        { type: { name: 'type3' } },
        { type: { name: 'type4' } }
    ],
    sprites: { front_default: 'url2' },
};

axios.get.mockImplementation((url) => {
    if (url === process.env.REACT_APP_API_URL) {
        return Promise.resolve({ data: { results: mockPokemonList } });
    } else if (url === 'https://pokeapi.co/api/v2/pokemon/1/') {
        return Promise.resolve({ data: mockPokemonData1 });
    } else if (url === 'https://pokeapi.co/api/v2/pokemon/2/') {
        return Promise.resolve({ data: mockPokemonData2 });
    }
    return Promise.reject(new Error('not found'));
});

describe('Composant Page1', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Math, 'random').mockReturnValue(0); 
    });

    afterEach(() => {
        jest.spyOn(Math, 'random').mockRestore(); 
    });

    test('rendu et affiche les options Pokémon au chargement', async () => {
        render(<Page1 />);

        await waitFor(() => {
            expect(screen.getByText('What type is pokemon1?')).toBeInTheDocument();
            expect(screen.getByText('type1')).toBeInTheDocument();
            expect(screen.getByText('type2')).toBeInTheDocument();
        });
    });

    test('gestion du clic d\'option et affiche le message correct', async () => {
        render(<Page1 />);

        await waitFor(() => {
            expect(screen.getByText('type1')).toBeInTheDocument();
            expect(screen.getByText('type2')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('type1'));

        await waitFor(() => {
            expect(screen.getByText('Correct!')).toBeInTheDocument();
            expect(screen.getByText('Next Question')).toBeInTheDocument();
        });
    });

    test('gestion du clic d\'option incorrect et affiche le message correct', async () => {
        render(<Page1 />);

        await waitFor(() => {
            expect(screen.getByText('type1')).toBeInTheDocument();
            expect(screen.getByText('type2')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('type2'));

        await waitFor(() => {
            expect(screen.getByText('Incorrect! The correct answer is type1.')).toBeInTheDocument();
            expect(screen.getByText('Next Question')).toBeInTheDocument();
        });
    });

    test('gestion du clic sur la question suivante et met à jour la question', async () => {
        render(<Page1 />);

        await waitFor(() => {
            expect(screen.getByText('type1')).toBeInTheDocument();
            expect(screen.getByText('type2')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('type1'));

        await waitFor(() => {
            expect(screen.getByText('Correct!')).toBeInTheDocument();
            expect(screen.getByText('Next Question')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Next Question'));

        jest.spyOn(Math, 'random').mockReturnValue(0.9); 

        await waitFor(() => {
            expect(screen.getByText('What type is pokemon2?')).toBeInTheDocument();
            expect(screen.getByText('type3')).toBeInTheDocument();
            expect(screen.getByText('type4')).toBeInTheDocument();
        });
    });
});