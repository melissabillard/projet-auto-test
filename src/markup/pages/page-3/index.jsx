import React, { useState, useEffect } from 'react';
import pokemonCardBack from '../../../assets/pokemon_card.png';
import axios from 'axios';

const Card = ({ pokemon, isFlipped, onClick }) => {
    const handleClick = () => {
        if (!isFlipped) {
            onClick(pokemon);
        }
    };

    return (
        <div className="card" onClick={handleClick}>
            {isFlipped ? (
                <img src={pokemon.image} alt={pokemon.name} />
            ) : (
                <img src={pokemonCardBack} alt="card back" />
            )}
        </div>
    );
};

export const fetchPokemonImages = async () => {
    const promises = Array.from({ length: 9 }, () =>
        axios.get(`${process.env.REACT_APP_API_URL}${Math.floor(Math.random() * 151) + 1}`)
    );
    const results = await Promise.all(promises);
    return results.map(({ data }) => ({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
    }));
};

export const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const startGame = async (setGameStarted, setTime, setFlippedCards, setMatchedPairs, setCards, setTimerInterval) => {
    setGameStarted(true);
    setTime(0);
    setFlippedCards([]);
    setMatchedPairs([]);

    const fetchedPokemons = await fetchPokemonImages();
    const shuffledCards = shuffleArray(
        [...fetchedPokemons, ...fetchedPokemons].map((pokemon, index) => ({
            ...pokemon,
            uniqueId: index
        }))
    );
    setCards(shuffledCards);

    // Démarrer le chronomètre
    const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimerInterval(interval);
};

export const handleCardClick = (pokemon, flippedCards, matchedPairs, setFlippedCards, setMatchedPairs, setCanFlip, canFlip) => {
    if (flippedCards.length === 2 || flippedCards.some(card => card.uniqueId === pokemon.uniqueId) || matchedPairs.includes(pokemon.id) || !canFlip) return;

    setFlippedCards((prev) => [...prev, pokemon]);

    if (flippedCards.length === 1) {
        if (flippedCards[0].id === pokemon.id) {
            setMatchedPairs((prev) => [...prev, pokemon.id]);
            setFlippedCards([]);
        } else {
            setCanFlip(false); // Empêcher de retourner d'autres cartes
            setTimeout(() => {
                setFlippedCards([]);
                setCanFlip(true); // Réactiver le retournement des cartes
            }, 1000);
        }
    }
};

const Page3 = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [canFlip, setCanFlip] = useState(true);
    const [timerInterval, setTimerInterval] = useState(null); // Nouvelle variable d'état pour le chronomètre

    useEffect(() => {
        if (matchedPairs.length === 9) {
            clearInterval(timerInterval);
        }
    }, [matchedPairs]);

    return (
        <div className="game font-page-3">
            <header className="App-header">
                <h1 className="font-page-3">Pokémon Memory</h1>
                {gameStarted ? (
                    <>
                        {matchedPairs.length === 9 ? (
                            <div className="victory-container">
                                <p>Félicitations ! Tu as gagné en {time} secondes !</p>
                                <div className="gif-container">
                                    <iframe
                                        src="https://giphy.com/embed/xx0JzzsBXzcMK542tx"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        className="giphy-embed"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>Temps : {time} secondes</p>
                                <div className="cards-container">
                                    {cards.map((pokemon) => (
                                        <Card
                                            key={pokemon.uniqueId}
                                            pokemon={pokemon}
                                            isFlipped={flippedCards.includes(pokemon) || matchedPairs.includes(pokemon.id)}
                                            onClick={() => handleCardClick(pokemon, flippedCards, matchedPairs, setFlippedCards, setMatchedPairs, setCanFlip, canFlip)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div className="gif-container">
                            <iframe
                                src="https://giphy.com/embed/tDJfaLVF0gHV90lxZj"
                                width="100%"
                                height="100%"
                                style={{ position: 'absolute' }}
                                frameBorder="0"
                                className="giphy-embed"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <button onClick={() => startGame(setGameStarted, setTime, setFlippedCards, setMatchedPairs, setCards, setTimerInterval)} className="start-button">
                        Start Game
                        </button>
                    </>
                )}
            </header>
        </div>
    );
};

export default Page3;
