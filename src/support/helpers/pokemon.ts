import type { Pokemon } from 'interfaces/pokemon'

export function getImageURLFromPokemon(pokemon: Pokemon) {
  return pokemon.artwork
}