import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page3 from '../../src/markup/pages/page-3'; // Assurez-vous que le chemin est correct

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({
        data: {
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'bulbasaur.png' },
        },
    })),
}));

test('renders the game start screen', () => {
    render(<Page3 />);
    expect(screen.getByText('Pokémon Memory')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
});

test('starts the game when the start button is clicked', async () => {
    render(<Page3 />);

    fireEvent.click(screen.getByText('Start Game'));

    expect(await screen.findByText('Temps : 0 secondes')).toBeInTheDocument();
    expect(await screen.findAllByAltText('card back')).toHaveLength(18); // 9 pairs of cards
});

test('flips a card when clicked', async () => {
    render(<Page3 />);

    fireEvent.click(screen.getByText('Start Game'));

    const cards = await screen.findAllByAltText('card back');
    fireEvent.click(cards[0]);

    expect(await screen.findByAltText('bulbasaur')).toBeInTheDocument();
});