import { fetchMoveData, fetchPokemonData, calculateDamage } from '../../src/markup/utils/pokemonUtil';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const apiMoveUrl = process.env.REACT_APP_API_MOVE_URL
const apiUrl = process.env.REACT_APP_API_URL


describe('pokemonUtil', () => {
    describe('fetchMoveData', () => {
        const moveUrl = `${apiMoveUrl}1/`;
        const moveData = {
            name: 'tackle',
            url: moveUrl,
            power: 50,
        };

        beforeEach(() => {
            mock.onGet(moveUrl).reply(200, moveData);
        });

        test('fetches move data correctly', async () => {
            const data = await fetchMoveData(moveUrl);
            expect(data).toEqual({
                name: 'tackle',
                url: moveUrl,
                power: 50,
            });
        });
    });

    describe('fetchPokemonData', () => {
        const pokemonId = 1;
        const pokemonData = {
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'bulbasaur.png' },
            stats: [
                { stat: { name: 'attack' }, base_stat: 49 },
                { stat: { name: 'defense' }, base_stat: 49 },
            ],
            abilities: [
                { ability: { name: 'overgrow' } },
                { ability: { name: 'chlorophyll' } }
            ],
            moves: [
                { move: { name: 'tackle', url: `${apiMoveUrl}1/` } },
                { move: { name: 'vine whip', url: `${apiMoveUrl}2/` } },
                { move: { name: 'razor leaf', url: `${apiMoveUrl}3/` } },
                { move: { name: 'solar beam', url: `${apiMoveUrl}4/` } }
            ],
        };

        beforeEach(() => {
            mock.onGet(`${apiMoveUrl}${pokemonId}`).reply(200, pokemonData);
            mock.onGet(`${apiMoveUrl}1/`).reply(200, { name: 'tackle', power: 40 });
            mock.onGet(`${apiMoveUrl}2/`).reply(200, { name: 'vine whip', power: 45 });
            mock.onGet(`${apiMoveUrl}3/`).reply(200, { name: 'razor leaf', power: 55 });
            mock.onGet(`${apiMoveUrl}4/`).reply(200, { name: 'solar beam', power: 120 });
        });

        // test('fetches Pokémon data correctly', async () => {
        //     const data = await fetchPokemonData(pokemonId);
        //     expect(data).toEqual({
        //         id: 1,
        //         name: 'bulbasaur',
        //         image: 'bulbasaur.png',
        //         stats: pokemonData.stats,
        //         abilities: pokemonData.abilities,
        //         moves: [
        //             { name: 'tackle', url: `${apiMoveUrl}1/`, power: 40 },
        //             { name: 'vine whip', url: `${apiMoveUrl}2/`, power: 45 },
        //             { name: 'razor leaf', url: `${apiMoveUrl}3/`, power: 55 },
        //             { name: 'solar beam', url: `${apiMoveUrl}4/`, power: 120 },
        //         ],
        //     });
        // });

        test('handles errors when fetching Pokémon data', async () => {
            mock.onGet(`${apiUrl}${pokemonId}`).reply(404);
            await expect(fetchPokemonData(pokemonId)).rejects.toThrow('Request failed with status code 404');
        });
    });

    describe('calculateDamage', () => {
        const attacker = {
            stats: [
                { stat: { name: 'attack' }, base_stat: 100 },
            ],
        };

        const defender = {
            stats: [
                { stat: { name: 'defense' }, base_stat: 50 },
            ],
        };

        const move = {
            name: 'tackle',
            power: 40,
        };

        test('calculates damage correctly', () => {
            const damage = calculateDamage(attacker, defender, move);
            expect(damage).toBeGreaterThan(0);
        });

        test('calculates damage with random factor', () => {
            jest.spyOn(Math, 'random').mockReturnValue(0.9);
            const damage = calculateDamage(attacker, defender, move);

            move.power = 40
            const level = 50;
            const basePower = move.power;
            const attackStat = 100;
            const defenseStat = 50;
            const randomFactor = Math.random() * (1 - 0.85) + 0.85;

            const expectedDamage = Math.floor((((2 * level / 5 + 2) * basePower * attackStat / defenseStat) / 50 + 2) * randomFactor);
            expect(damage).toBe(expectedDamage);
            Math.random.mockRestore();
        });
    });
});