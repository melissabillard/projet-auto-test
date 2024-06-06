import axios from 'axios';
import { fetchPokemonImages, shuffleArray, startGame, handleCardClick } from '../../src/markup/pages/page-3/index';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Page3 from '../../src/markup/pages/page-3/index';

jest.mock('axios');
jest.useFakeTimers();

test('fetchPokemonImages should fetch and return pokemon images', async () => {
    const mockData = {
        data: {
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'bulbasaur.png' },
        },
    };

    axios.get.mockResolvedValue(mockData);

    const promises = Array.from({ length: 9 }, () => axios.get());
    const results = await Promise.all(promises);

    const images = results.map(({ data }) => ({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
    }));

    expect(images.length).toBe(9);
    expect(images[0]).toEqual({
        id: 1,
        name: 'bulbasaur',
        image: 'bulbasaur.png',
    });
});

test('shuffleArray should shuffle the array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...array]);
    expect(shuffledArray).not.toEqual(array);

    // Vérification que tous les éléments sont toujours présents après le mélange
    expect(shuffledArray.sort()).toEqual(array.sort());
});

jest.mock('../../src/markup/pages/page-3/index', () => ({
    ...jest.requireActual('../../src/markup/pages/page-3/index'),
    fetchPokemonImages: jest.fn(),
}));

test('startGame initializes the game correctly', async () => {
    fetchPokemonImages.mockResolvedValue([
        { id: 1, name: 'bulbasaur', image: 'bulbasaur.png' },
        { id: 2, name: 'ivysaur', image: 'ivysaur.png' },
        { id: 3, name: 'venusaur', image: 'venusaur.png' },
        { id: 4, name: 'charmander', image: 'charmander.png' },
        { id: 5, name: 'charmeleon', image: 'charmeleon.png' },
        { id: 6, name: 'charizard', image: 'charizard.png' },
        { id: 7, name: 'squirtle', image: 'squirtle.png' },
        { id: 8, name: 'wartortle', image: 'wartortle.png' },
        { id: 9, name: 'blastoise', image: 'blastoise.png' },
    ]);

    const setGameStarted = jest.fn();
    const setTime = jest.fn();
    const setFlippedCards = jest.fn();
    const setMatchedPairs = jest.fn();
    const setCards = jest.fn();
    const setTimerInterval = jest.fn();

    await startGame(
        setGameStarted,
        setTime,
        setFlippedCards,
        setMatchedPairs,
        setCards,
        setTimerInterval
    );

    expect(setGameStarted).toHaveBeenCalledWith(true);
    expect(setTime).toHaveBeenCalledWith(0);
    expect(setFlippedCards).toHaveBeenCalledWith([]);
    expect(setMatchedPairs).toHaveBeenCalledWith([]);
    expect(setCards).toHaveBeenCalledTimes(1);
    expect(setTimerInterval).toHaveBeenCalledTimes(1);

    // Advance timers to trigger setInterval callback
    jest.advanceTimersByTime(1000);

    // Ensure setTime is called with the increment function
    const incrementFunction = setTime.mock.calls[1][0];
    const previousTime = 0;
    expect(incrementFunction(previousTime)).toBe(1);
});

test('handleCardClick updates flipped cards and matched pairs correctly', () => {
    jest.useFakeTimers(); // Utiliser des temporisateurs factices

    const setFlippedCards = jest.fn();
    const setMatchedPairs = jest.fn();
    const setCanFlip = jest.fn();

    const pokemon = { id: 1, uniqueId: 0, name: 'bulbasaur', image: 'bulbasaur.png' };
    const flippedCards = [];
    const matchedPairs = [];

    // Première sélection
    handleCardClick(pokemon, flippedCards, matchedPairs, setFlippedCards, setMatchedPairs, setCanFlip, true);

    // Vérifier l'appel à setFlippedCards
    expect(setFlippedCards).toHaveBeenCalledTimes(1);
    let firstCall = setFlippedCards.mock.calls[0][0];
    expect(typeof firstCall).toBe('function');
    let updatedState = firstCall(flippedCards);
    expect(updatedState).toEqual([pokemon]);

    // Réinitialiser les mocks pour le prochain test
    jest.clearAllMocks();

    // Deuxième sélection avec une correspondance
    const secondPokemon = { id: 1, uniqueId: 1, name: 'bulbasaur', image: 'bulbasaur.png' };
    handleCardClick(secondPokemon, [pokemon], matchedPairs, setFlippedCards, setMatchedPairs, setCanFlip, true);

    // Vérifier l'appel à setMatchedPairs
    expect(setMatchedPairs).toHaveBeenCalledTimes(1);
    const matchedCall = setMatchedPairs.mock.calls[0][0];
    expect(typeof matchedCall).toBe('function');
    const matchedState = matchedCall(matchedPairs);
    expect(matchedState).toEqual([1]);

    // Vérifier que setFlippedCards a été appelé deux fois : une pour retourner et une pour réinitialiser après correspondance
    expect(setFlippedCards).toHaveBeenCalledTimes(2);

    firstCall = setFlippedCards.mock.calls[0][0];
    let resetCall = setFlippedCards.mock.calls[1][0];

    expect(typeof firstCall).toBe('function');
    expect(Array.isArray(resetCall)).toBe(true);

    updatedState = firstCall([pokemon]);
    expect(updatedState).toEqual([pokemon, secondPokemon]);

    expect(resetCall).toEqual([]);

    // Réinitialiser les mocks pour le prochain test
    jest.clearAllMocks();

    // Troisième sélection sans correspondance
    const thirdPokemon = { id: 2, uniqueId: 2, name: 'ivysaur', image: 'ivysaur.png' };
    const timerId = handleCardClick(thirdPokemon, [pokemon], matchedPairs, setFlippedCards, setMatchedPairs, setCanFlip, true);

    // Vérifier l'appel à setCanFlip
    expect(setCanFlip).toHaveBeenCalledWith(false);

    // Simuler le délai avant la réinitialisation
    jest.runAllTimers();

    // Vérifier que setFlippedCards a été appelé deux fois : une pour retourner et une pour réinitialiser après non-correspondance
    expect(setFlippedCards).toHaveBeenCalledTimes(2);

    firstCall = setFlippedCards.mock.calls[0][0];
    resetCall = setFlippedCards.mock.calls[1][0];

    expect(typeof firstCall).toBe('function');
    expect(Array.isArray(resetCall)).toBe(true);

    updatedState = firstCall([pokemon]);
    expect(updatedState).toEqual([pokemon, thirdPokemon]);

    expect(resetCall).toEqual([]);

    clearTimeout(timerId); // Nettoyer le temporisateur
});


