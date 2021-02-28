import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./PokemonCard.module.css";

function PokemonCard({ pokemon, className }) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className={classNames(styles.box, className)}
    >
      <div>{pokemon.name}</div>
      <img alt={pokemon.name} className={styles.image} src={pokemon.imageURL} />
    </Link>
  );
}

export default PokemonCard;
