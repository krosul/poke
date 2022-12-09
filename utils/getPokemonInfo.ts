import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

const getPokemonInfo = async (nameOrId: string) => {


  let { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}/`, {
    headers: {
      "accept-encoding": "*",
    },
  });
  const pokemonFixed = [data].map((p) => {
    return { name: p.name, sprites: p.sprites, id: p.id, types: p.types };
  });
  return pokemonFixed[0]
};

export default getPokemonInfo;
