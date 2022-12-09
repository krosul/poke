import { Card, Grid } from "@nextui-org/react";
import { FC } from "react";
import { PokemonCardFavorite } from "./PokemonCardFavorite";
interface Props {
  FavoritesPokemons: number[];
}

export const LayoutPokemons: FC<Props> = ({ FavoritesPokemons }) => {
  return (
    <Grid.Container gap={2} direction={"row"} justify="flex-start">
      {FavoritesPokemons.map((id: number) => (
        <PokemonCardFavorite id={id} key={id}/>
      ))}
    </Grid.Container>
  );
};
