import { useState,FC } from "react";


import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { MainLayout } from "../../components/layouts";
import confetti from "canvas-confetti";

import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import getPokemonInfo from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonPageDetails: FC<Props> = ({ pokemon }) => {
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
  
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };


  return {
    props: {
      pokemon: await getPokemonInfo(id)
    },
  };
};
export default PokemonPageDetails;
