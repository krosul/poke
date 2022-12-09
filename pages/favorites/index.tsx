import { FC, useEffect, useState } from "react";
import { Card, Grid } from "@nextui-org/react";
import { MainLayout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { LayoutPokemons } from "../../components/ui";

const FavoritePages: FC = () => {
  const [FavoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.getPokemons());
  }, []);

  return (
    <MainLayout title="Pokemons favorites">
      {!FavoritesPokemons.length ? (
        <NoFavorites />
      ) : (
        <LayoutPokemons FavoritesPokemons={FavoritesPokemons}/>
      )}
    </MainLayout>
  );
};

export default FavoritePages;
