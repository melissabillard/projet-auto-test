import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const fetchMoveData = async (moveUrl) => {
    const response = await axios.get(moveUrl);
    return {
        name: response.data.name,
        url: moveUrl,
        power: response.data.power !== null && response.data.power !== undefined ? response.data.power : 40
    };
};

export const fetchPokemonData = async (pokemonId) => {
    const response = await axios.get(`${apiUrl}${pokemonId}`);
    const moveDetailsPromises = response.data.moves.slice(0, 4).map(move => fetchMoveData(move.move.url));
    const moveDetails = await Promise.all(moveDetailsPromises);

    return {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
        stats: response.data.stats,
        abilities: response.data.abilities,
        moves: moveDetails
    };
};

export const calculateDamage = (attacker, defender, move) => {
    const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const baseDamage = move.power !== null && move.power !== undefined ? move.power : 40;

    const randomFactor = Math.random() * (1 - 0.85) + 0.85;
    const damage = (((2 * 50 / 5 + 2) * baseDamage * attackStat / defenseStat) / 50 + 2) * randomFactor;
    return Math.floor(damage);
};