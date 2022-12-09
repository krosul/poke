import { NextPage, GetStaticProps } from "next";

import { MainLayout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonAPIResponse, smallPokemon } from "../interfaces";
import axios from "axios";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: smallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {

  return (
    <MainLayout>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id}/>
        ))}
      </Grid.Container>
    </MainLayout>
  );
};




export const getStaticProps: GetStaticProps = async (ctx) => {
  let { data } = await pokeApi.get<PokemonAPIResponse>("/pokemon?limit=151", {
    headers: {
      "accept-encoding": "*",
    },
  });
  let req = data.results.map(async (p) => {
    let { data } = await axios.get(p.url, {
      headers: {
        "accept-encoding": "*",
      },
    });
    return {
      ...p,
      id: data.id,
      image: data.sprites.other.dream_world.front_default,
    };
  });

  const pokemons = await axios.all(req);
  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
