function getEnglishName(names) {
  return names.find((item) => item.language.name === "en")?.name || "Unknown";
}

export function parsePokemon(
  pokemonResponse,
  pokemonSpeciesResponse,
  typeResponses,
  abilityResponses
) {
  return {
    id: pokemonResponse.id,
    slug: pokemonResponse.name,
    name: getEnglishName(pokemonSpeciesResponse.names),
    types: typeResponses.map((type) => ({
      name: getEnglishName(type.names),
    })),
    abilities: abilityResponses.map((ability) => ({
      name: getEnglishName(ability.names),
    })),
    // Step 1
    // Parse out image information in here
    // imageURL: some property from one of the provided function arguments
  };
}
