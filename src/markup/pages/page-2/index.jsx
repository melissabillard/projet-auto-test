import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

export default function Page2() {
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [damage, setDamage] = useState(0);
    const [turn, setTurn] = useState('player');
    const [battleLog, setBattleLog] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const logEndRef = useRef(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            const promises = Array.from({ length: 25 }, () =>
                axios.get(`${process.env.REACT_APP_API_URL}${Math.floor(Math.random() * 151) + 1}`)
            );
            const results = await Promise.all(promises);
            setPokemons(results.map(res => res.data));
        };
        fetchPokemons();
    }, []);

    const handleSelectPokemon = async (pokemon) => {
        const selectedPokemon = await fetchPokemonData(pokemon.id);
        setPlayerPokemon({ ...selectedPokemon, currentHP: 100, totalHP: 100 });
        const randomId = Math.floor(Math.random() * 151) + 1;
        const fetchedOpponentPokemon = await fetchPokemonData(randomId);
        setOpponentPokemon({ ...fetchedOpponentPokemon, currentHP: 100, totalHP: 100 });
        setGameOver(false);
    };

    const fetchPokemonData = async (pokemonId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}${pokemonId}`);
        return {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
            stats: response.data.stats,
            abilities: response.data.abilities,
            moves: response.data.moves.slice(0, 4).map(move => ({
                name: move.move.name,
                url: move.move.url,
                power: move.move.power !== null ? move.move.power : 40
            }))
        };
    };

    const calculateDamage = (attacker, defender, move) => {
        const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
        const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
        const baseDamage = move.power !== null && move.power !== undefined ? move.power : 40;

        const randomFactor = Math.random() * (1 - 0.85) + 0.85;
        const damage = (((2 * 50 / 5 + 2) * baseDamage * attackStat / defenseStat) / 50 + 2) * randomFactor;
        return Math.floor(damage);
    };

    const handleAttack = (attacker, defender, move, attackerType) => {
        if (gameOver) return; // Si le jeu est terminé, ne pas permettre l'attaque

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

    const handleSelectMove = (move) => {
        if (turn === 'player') {
            handleAttack(playerPokemon, opponentPokemon, move, 'player');
            setTurn('opponent');
        }
    };

    useEffect(() => {
        if (turn === 'opponent' && opponentPokemon && playerPokemon && !gameOver) {
            const randomMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];
            setTimeout(() => {
                handleAttack(opponentPokemon, playerPokemon, randomMove, 'opponent');
                setTurn('player');
            }, 1000);
        }
    }, [turn, opponentPokemon, playerPokemon, gameOver]);

    useEffect(() => {
        if (playerPokemon && playerPokemon.currentHP === 0) {
            setGameOver(true);
        } else if (opponentPokemon && opponentPokemon.currentHP === 0) {
            setGameOver(true); 
        }
    }, [playerPokemon, opponentPokemon]);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [battleLog]);

    const resetGame = () => {
        setPlayerPokemon(null);
        setOpponentPokemon(null);
        setDamage(0);
        setTurn('player');
        setBattleLog([]);
        setGameOver(false);
    };

    const BattleAnimation = ({ damage }) => {
        const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

        return (
            <animated.div style={props} className="animated">
                <p>{`Damage: ${damage}`}</p>
            </animated.div>
        );
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
                                    <div key={pokemon.id} onClick={() => handleSelectPokemon(pokemon)}>
                                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                        <p>{pokemon.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            opponentPokemon && (
                                <div className="battle-arena">
                                    <div className="pokemon-row">
                                        <div className="pokemon-player">
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
                                            <button className='bt-quizz' key={move.name} onClick={() => handleSelectMove(move)} disabled={turn !== 'player'}>{move.name}</button>
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
}