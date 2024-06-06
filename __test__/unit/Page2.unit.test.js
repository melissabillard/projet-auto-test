import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import Page2, {
    useFetchPokemons,
    handleSelectPokemon,
    handleAttack,
    handleSelectMove,
    useOpponentTurn,
    useCheckGameOver,
} from '../../src/markup/pages/page-2/index'; 
import { calculateDamage, fetchPokemonData } from '../../src/markup/utils/pokemonUtil';

jest.mock('axios');
jest.mock('../../src/markup/utils/pokemonUtil');

// Test useFetchPokemons function
describe('useFetchPokemons', () => {
  test('récupère et set les Pokémon', async () => {
    const mockPokemons = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `pokemon${index + 1}`,
        sprites: { front_default: `url${index + 1}` },
    }));
    
    axios.get.mockImplementation(() => Promise.resolve({ data: { id: 1, name: 'bulbasaur', sprites: { front_default: 'url1' } } }));
    
    const setPokemons = jest.fn();
    
    await act(async () => {
        renderHook(() => useFetchPokemons(setPokemons));
    });

    expect(axios.get).toHaveBeenCalledTimes(25);
    expect(setPokemons).toHaveBeenCalled();
  });
});


describe('handleSelectPokemon', () => {
  test('définir les pokémons du joueur et de adversaire', async () => {
      const mockPokemon = { id: 1, name: 'bulbasaur' };
      fetchPokemonData.mockResolvedValueOnce(mockPokemon).mockResolvedValueOnce(mockPokemon);

      const setPlayerPokemon = jest.fn();
      const setOpponentPokemon = jest.fn();
      const setGameOver = jest.fn();

      await handleSelectPokemon(mockPokemon, setPlayerPokemon, setOpponentPokemon, setGameOver);

      expect(fetchPokemonData).toHaveBeenCalledWith(mockPokemon.id);
      expect(fetchPokemonData).toHaveBeenCalledTimes(2);
      expect(setPlayerPokemon).toHaveBeenCalledWith({ ...mockPokemon, currentHP: 100, totalHP: 100 });
      expect(setOpponentPokemon).toHaveBeenCalledWith({ ...mockPokemon, currentHP: 100, totalHP: 100 });
      expect(setGameOver).toHaveBeenCalledWith(false);
  });
});

describe('handleAttack', () => {
  test('calcule et applique les dommages', () => {
      const attacker = { name: 'bulbasaur', moves: [{ name: 'tackle' }] };
      const defender = { currentHP: 100, name: 'charmander' };
      const move = { name: 'tackle' };
      const setDamage = jest.fn();
      const setPlayerPokemon = jest.fn();
      const setOpponentPokemon = jest.fn();
      const setBattleLog = jest.fn();
      const gameOver = false;

      calculateDamage.mockReturnValue(20);

      handleAttack(attacker, defender, move, 'player', setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver);

      expect(calculateDamage).toHaveBeenCalledWith(attacker, defender, move);
      expect(setDamage).toHaveBeenCalledWith(20);
      expect(setOpponentPokemon).toHaveBeenCalledWith(expect.any(Function));
      expect(setBattleLog).toHaveBeenCalledWith(expect.any(Function));
  });

  test('ne fait rien si le jeu est terminé', () => {
      const setDamage = jest.fn();
      const setPlayerPokemon = jest.fn();
      const setOpponentPokemon = jest.fn();
      const setBattleLog = jest.fn();

      handleAttack({}, {}, {}, 'player', setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, true);

      expect(setDamage).not.toHaveBeenCalled();
      expect(setPlayerPokemon).not.toHaveBeenCalled();
      expect(setOpponentPokemon).not.toHaveBeenCalled();
      expect(setBattleLog).not.toHaveBeenCalled();
  });
});

describe('handleSelectMove', () => {
  test('gère la sélection des mouvements du joueur et change de tour', () => {
      const move = { name: 'tackle' };
      const setTurn = jest.fn();
      const setDamage = jest.fn();
      const setPlayerPokemon = jest.fn();
      const setOpponentPokemon = jest.fn();
      const setBattleLog = jest.fn();
      const playerPokemon = { name: 'bulbasaur' };
      const opponentPokemon = { name: 'charmander' };
      const turn = 'player';
      const gameOver = false;

      handleSelectMove(move, turn, setTurn, playerPokemon, opponentPokemon, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver);

      expect(setTurn).toHaveBeenCalledWith('opponent');
  });

  test('ne fait rien si ce n\'est pas le tour du joueur', () => {
      const move = { name: 'tackle' };
      const setTurn = jest.fn();
      const setDamage = jest.fn();
      const setPlayerPokemon = jest.fn();
      const setOpponentPokemon = jest.fn();
      const setBattleLog = jest.fn();
      const playerPokemon = { name: 'bulbasaur' };
      const opponentPokemon = { name: 'charmander' };
      const turn = 'opponent';
      const gameOver = false;

      handleSelectMove(move, turn, setTurn, playerPokemon, opponentPokemon, setDamage, setPlayerPokemon, setOpponentPokemon, setBattleLog, gameOver);

      expect(setTurn).not.toHaveBeenCalled();
  });
});


describe('useOpponentTurn', () => {
  test('gère le tour et l\'attaque de l\'adversaire', () => {
      jest.useFakeTimers();
      const handleAttack = jest.fn();
      const setTurn = jest.fn();
      const opponentPokemon = { name: 'charmander', moves: [{ name: 'scratch' }] };
      const playerPokemon = { name: 'bulbasaur' };
      const turn = 'opponent';
      const gameOver = false;

      const { rerender } = renderHook(() => useOpponentTurn(turn, opponentPokemon, playerPokemon, setTurn, handleAttack, gameOver));

      jest.runAllTimers();

      expect(handleAttack).toHaveBeenCalled();
      expect(setTurn).toHaveBeenCalledWith('player');
  });
});


describe('useCheckGameOver', () => {
  test('vérifie et définit l\'état du jeu', () => {
      const setGameOver = jest.fn();
      const playerPokemon = { currentHP: 0 };
      const opponentPokemon = { currentHP: 50 };

      renderHook(() => useCheckGameOver(playerPokemon, opponentPokemon, setGameOver));

      expect(setGameOver).toHaveBeenCalledWith(true);
  });

  test('ne met pas fin au jeu si les deux pokémons sont vivants', () => {
      const setGameOver = jest.fn();
      const playerPokemon = { currentHP: 50 };
      const opponentPokemon = { currentHP: 50 };

      renderHook(() => useCheckGameOver(playerPokemon, opponentPokemon, setGameOver));

      expect(setGameOver).not.toHaveBeenCalled();
  });
});