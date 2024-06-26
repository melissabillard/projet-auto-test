import React, { useState, useEffect, useRef } from 'react';
import { fetchPokemonData, calculateDamage } from '../../utils/pokemonUtil';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';


const API_URL = process.env.REACT_APP_API_URL;

export const useFetchPokemons = (setPokemons) => {
    useEffect(() => {
        const fetchPokemons = async () => {
            const promises = Array.from({ length: 25 }, () =>
                axios.get(`${API_URL}${Math.floor(Math.random() * 151) + 1}`)
            );
            const results = await Promise.all(promises);
            setPokemons(results.map(res => res.data));
        };
        fetchPokemons();
    }, [setPokemons]);
};

export const handleSelectPokemon = async (pokemon, setPlayerPokemon, setOpponentPokemon, setGameOver) => {
    const selectedPokemon = await fetchPokemonData(pokemon.id);
    setPlayerPokemon({ ...selectedPokemon, currentHP: 100, totalHP: 100 });
    const randomId = Math.floor(Math.random() * 151) + 1;
    const fetchedOpponentPokemon = await fetchPokemonData(randomId);
    setOpponentPokemon({ ...fetchedOpponentPokemon, currentHP: 100, totalHP: 100 });
    setGameOver(false);
};

export const handleAttack = (attacker, defender, move, attackerType, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver) => {
    if (gameOver) return;

    const damage = calculateDamage(attacker, defender, move);
    setDamage(damage);
    if (attackerType === 'player') {
        setOpponentPokemon((prev) => ({
            ...prev,
            currentHP: Math.max(prev.currentHP - damage, 0),
        }));
    } else {
        setPlayerPokemon((prev) => ({
            ...prev,
            currentHP: Math.max(prev.currentHP - damage, 0),
        }));
    }
    setBattleLog((prev) => [...prev, `${attacker.name} used ${move.name}! It did ${damage} damage!`]);
};

export const handleSelectMove = (move, turn, setTurn, playerPokemon, opponentPokemon, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver) => {
    if (turn === 'player') {
        handleAttack(playerPokemon, opponentPokemon, move, 'player', setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver);
        setTurn('opponent');
    }
};

export const useOpponentTurn = (turn, opponentPokemon, playerPokemon, setTurn, handleAttack, gameOver) => {
    useEffect(() => {
        if (turn === 'opponent' && opponentPokemon && playerPokemon && !gameOver) {
            const randomMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];
            setTimeout(() => {
                handleAttack(opponentPokemon, playerPokemon, randomMove, 'opponent');
                setTurn('player');
            }, 1000);
        }
    }, [turn, opponentPokemon, playerPokemon, handleAttack, setTurn, gameOver]);
};

export const useCheckGameOver = (playerPokemon, opponentPokemon, setGameOver) => {
    useEffect(() => {
        if (playerPokemon && playerPokemon.currentHP === 0) {
            setGameOver(true);
        } else if (opponentPokemon && opponentPokemon.currentHP === 0) {
            setGameOver(true);
        }
    }, [playerPokemon, opponentPokemon, setGameOver]);
};

export const useScrollToLogEnd = (battleLog, logEndRef) => {
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [battleLog, logEndRef]);
};

export const BattleAnimation = ({ damage }) => {
    const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
    return (
        <animated.div style={props} className="animated">
            <p>{`Damage: ${damage}`}</p>
        </animated.div>
    );
};

const Page2 = () => {
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [damage, setDamage] = useState(0);
    const [turn, setTurn] = useState('player');
    const [battleLog, setBattleLog] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const logEndRef = useRef(null);

    useFetchPokemons(setPokemons);
    useOpponentTurn(turn, opponentPokemon, playerPokemon, setTurn, (attacker, defender, move, attackerType) => handleAttack(attacker, defender, move, attackerType, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver), gameOver);
    useCheckGameOver(playerPokemon, opponentPokemon, setGameOver);
    useScrollToLogEnd(battleLog, logEndRef);

    const resetGame = () => {
        setPlayerPokemon(null);
        setOpponentPokemon(null);
        setDamage(0);
        setTurn('player');
        setBattleLog([]);
        setGameOver(false);
    };

    return (
        <>
            <header className="App-header">
                <div className="jeu-wrapper">
                    <h1 className='font-page-2'>Pokémon Battle Simulator</h1>
                    <div className="App-body">
                        {!playerPokemon ? (
                            <div className="pokemon-selection">
                                {pokemons.map(pokemon => (
                                    <div key={pokemon.id} data-testid="selected-pokemon" onClick={() => handleSelectPokemon(pokemon, setPlayerPokemon, setOpponentPokemon, setGameOver)}>
                                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                        <p>{pokemon.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            opponentPokemon && (
                                <div className="battle-arena">
                                    <div className="pokemon-row">
                                        <div className="pokemon-player" >
                                            <img src={playerPokemon.image} alt={playerPokemon.name} />
                                            <div className="stats">
                                                <p>{playerPokemon.name}</p>
                                                <p>HP: {playerPokemon.currentHP}/{playerPokemon.totalHP}</p>
                                            </div>
                                        </div>
                                        <div className="pokemon-opponent">
                                            <img src={opponentPokemon.image} alt={opponentPokemon.name} />
                                            <div className="stats">
                                                <p>{opponentPokemon.name}</p>
                                                <p>HP: {opponentPokemon.currentHP}/{opponentPokemon.totalHP}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        {playerPokemon.moves.map(move => (
                                            <button className='bt-quizz' key={move.name} onClick={() => handleSelectMove(move, turn, setTurn, playerPokemon, opponentPokemon, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver)} disabled={turn !== 'player'}>{move.name}</button>
                                        ))}
                                    </div>
                                    <BattleAnimation damage={damage} />
                                    <div className="battle-log">
                                        {battleLog.map((log, index) => (
                                            <div key={index} className="log-entry">
                                                <img src="https://img.icons8.com/color/48/000000/pokeball-2.png" alt="pokeball" className="log-icon" />
                                                <span className="log-text">{log}</span>
                                            </div>
                                        ))}
                                        <div ref={logEndRef} />
                                    </div>
                                    {gameOver && (
                                        <div className="game-over">
                                            <p>{playerPokemon?.currentHP === 0 ? 'You lost the battle!' : 'You won the battle!'}</p>
                                            <button className="bt-restart" onClick={resetGame}>Restart Game</button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Page2;