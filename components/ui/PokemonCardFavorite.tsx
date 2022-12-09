import { Card, Grid } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

export const PokemonCardFavorite: FC<Props> = ({ id }) => {
  const router = useRouter();
  const onFavoritedClick = () => {
    return router.push(`/pokemon/${id}`);
  };
  return (
    <Grid xs={6} md={2} xl={1} key={id} onClick={onFavoritedClick}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={"140px"}
        />
      </Card>
    </Grid>
  );
};
