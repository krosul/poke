import { useTheme, Text, Spacer, Link, Container } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="logo"
        width={"60"}
        height={"60"}
      />
      <NextLink href="/" passHref >
        <Container
          css={{
            paddingLeft:"0px",
            justifyContent:"center",
            alignItems:"center",
            color:"white",
            transition: "all 300ms",
            display: "flex",
            "&:hover": {
              color: "#787F85",
            },
          }}
        >
          <Text color="inherit"  h3 weight="semibold">
            P
          </Text>
          <Text color="inherit" h4 weight="semibold">
            okemon
          </Text>
        </Container>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      <NextLink href="/favorites" passHref>
        <Text
          color="white"
          weight="semibold"
          css={{
            transition: "all 300ms",
            "&:hover": {
              color: "#787F85",
            },
          }}
        >
          Favorites
        </Text>
      </NextLink>
    </div>
  );
};
