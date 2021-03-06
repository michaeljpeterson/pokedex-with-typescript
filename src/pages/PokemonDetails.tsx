import React from "react";
import { useParams } from "react-router-dom";

import { fetchPokemonSpeciesByID } from "support/api/pokemonAPI";
import { getImageURLFromPokemon } from "support/helpers/pokemon";
import { useAsync } from "hooks/async";

import type { Pokemon } from "interfaces/pokemon";

import styles from "./PokemonDetails.module.css";

function PokemonDetails() {
  const { id } = useParams<{ id: string }>();

  const { state, run } = useAsync<Pokemon>();

  React.useEffect(() => {
    run(fetchPokemonSpeciesByID(id));
  }, [id, run]);

  if (state.status === "loading" || state.status === "idle") {
    return <span>Loading...</span>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success") {
    const { data: pokemon } = state;
    return (
      <div className={styles.container}>
        <div className={styles.name}>{pokemon.name}</div>
        <img
          alt={pokemon.name}
          src={getImageURLFromPokemon(pokemon)}
          className={styles.artwork}
        />
        <ul className={styles.ul}>
          Types:
          {pokemon.types.map((type, index) => {
            return <li key={index}>{type.name}</li>;
          })}
        </ul>
        <ul className={styles.ul}>
          Abilities:
          {pokemon.abilities.map((ability, index) => {
            return <li key={index}>{ability.name}</li>;
          })}
        </ul>
      </div>
    );
  }

  return null;
}

export default PokemonDetails;
