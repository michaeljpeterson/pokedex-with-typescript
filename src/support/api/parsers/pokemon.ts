import type {
  AbilityResponse,
  LocalizedName,
  PokemonResponse,
  PokemonSpeciesResponse,
  TypeResponse
} from "../interfaces/pokemonApi";
import type { Pokemon } from "interfaces/pokemon";

function getEnglishName(names: LocalizedName[]) {
  return names.find((item) => item.language.name === "en")?.name || "Unknown";
}

export function parsePokemon(
  pokemonResponse: PokemonResponse,
  pokemonSpeciesResponse: PokemonSpeciesResponse,
  typeResponses: TypeResponse[],
  abilityResponses: AbilityResponse[]
): Pokemon {
  return {
    id: pokemonResponse.id,
    slug: pokemonResponse.name,
    name: getEnglishName(pokemonSpeciesResponse.names),
    types: typeResponses.map((type) => ({
      name: getEnglishName(type.names)
    })),
    abilities: abilityResponses.map((ability) => ({
      name: getEnglishName(ability.names)
    })),
    imageURL: pokemonResponse.sprites.other["official-artwork"].front_default
  };
}
