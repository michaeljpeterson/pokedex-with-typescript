interface NamedAPIResource {
  name: string;
  url: string;
}

export interface LocalizedName {
  name: string;
  language: NamedAPIResource;
}

export interface PokemonResponse {
  species: NamedAPIResource;
  name: string;
  id: number;
  abilities: {
    slot: number;
    is_hidden: boolean;
    ability: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonSpeciesResponse {
  id: number;
  name: string;
  names: LocalizedName[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: NamedAPIResource;
  }[];
  varieties: {
    is_default: boolean;
    pokemon: NamedAPIResource;
  }[];
}

export interface TypeResponse {
  id: number;
  name: string;
  names: LocalizedName[];
}

export interface AbilityResponse {
  id: number;
  name: string;
  names: LocalizedName[];
}

export interface PokedexResponse {
  id: number;
  name: string;
  pokemon_entries: {
    entry_number: number;
    pokemon_species: NamedAPIResource;
  }[];
}

export interface ResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
