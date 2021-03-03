import { Link } from "react-router-dom";
import classNames from "classnames";

import { getImageURLFromPokemon } from "support/helpers/pokemon";
import type { Pokemon } from "interfaces/pokemon";

import styles from "./PokemonCard.module.css";

type Props = {
  pokemon: Pokemon;
  className?: string;
};

function PokemonCard({ pokemon, className }: Props) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className={classNames(styles.box, className)}
    >
      <div>{pokemon.name}</div>
      <img
        alt={pokemon.name}
        className={styles.image}
        src={getImageURLFromPokemon(pokemon)}
      />
    </Link>
  );
}

export default PokemonCard;
