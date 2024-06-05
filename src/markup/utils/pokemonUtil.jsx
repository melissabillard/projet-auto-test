import axios from 'axios';

export const fetchPokemonData = async (pokemonId) => {
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

export const calculateDamage = (attacker, defender, move) => {
    const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const baseDamage = move.power !== null && move.power !== undefined ? move.power : 40;

    const randomFactor = Math.random() * (1 - 0.85) + 0.85;
    const damage = (((2 * 50 / 5 + 2) * baseDamage * attackStat / defenseStat) / 50 + 2) * randomFactor;
    return Math.floor(damage);
};