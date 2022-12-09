import { useState } from "react";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { FC } from "react";
import { pokeApi } from "../../api";
import { MainLayout } from "../../components/layouts";
import confetti from "canvas-confetti";

import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { PokemonAPIResponse } from '../../interfaces/pokemonApiResponse';

interface Props {
  pokemon: Pokemon;
}

const PokemonPageDetailsByName: FC<Props> = ({ pokemon }) => {
  const [ToggleFavorite, setToggleFavorite] = useState(
    localFavorites.existPokemonFavorite(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setToggleFavorite(localFavorites.existPokemonFavorite(pokemon.id));
    if (ToggleFavorite) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <MainLayout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image-png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost onPress={onToggleFavorite}>
                {!ToggleFavorite
                  ? "save to favorites"
                  : "Delete from favorites"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Container
                display="flex"
                direction="row"
                alignItems="center"
                css={{ paddingLeft: "0px" }}
              >
                <Text
                  size={35}
                  h2
                  css={{ marginRight: "15px", paddingLeft: "0px" }}
                >
                  Type:
                </Text>
                {pokemon.types.map(({ type }, index) => (
                  <Text key={index} size={20} css={{ marginRight: "5px" }}>
                    {type.name}
                  </Text>
                ))}
              </Container>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let { data } = await pokeApi.get<PokemonAPIResponse>("/pokemon?limit=151", {
    headers: {
      "accept-encoding": "*",
    },
  });

  let pokemon151=data.results.map((poke)=>`${poke.name}`)
  
  return {
    paths: pokemon151.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};
 
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
    console.log(params) 
  let { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}/`, {
    headers: {
      "accept-encoding": "*",
    },
  });
  const pokemonFixed = [data].map((p) => {
    return { name: p.name, sprites: p.sprites, id: p.id, types: p.types };
  });
  return {
    props: {
      pokemon: pokemonFixed[0],
    },
  };
};
export default PokemonPageDetailsByName;
