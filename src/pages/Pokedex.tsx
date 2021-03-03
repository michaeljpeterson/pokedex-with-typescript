import React from "react";

import { useAsync } from "hooks/async";
import { fetchPokemonList } from "support/api/pokemonAPI";
import PokemonCard from "components/PokemonCard";

import type { PaginableList, Pokemon } from "interfaces/pokemon";

import styles from "./Pokedex.module.css";

function Pokedex() {
  const { state, run } = useAsync<PaginableList<Pokemon>>();

  React.useEffect(() => {
    run(fetchPokemonList());
  }, [run]);

  if (state.status === "loading" || state.status === "idle") {
    return <span>Loading...</span>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  const { data } = state;
  return (
    <div className={styles.list}>
      {data.results.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            className={styles.card}
          />
        );
      })}
    </div>
  );
}

export default Pokedex;
