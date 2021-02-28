export interface Pokemon {
  id: number;
  slug: string;
  name: string;
  types: Type[];
  abilities: Ability[];
  imageURL: string;
}

export interface Type {
  name: string;
}

export interface Ability {
  name: string;
}

export interface Pokedex {
  name: string;
  entries: {
    pokemon: Pokemon;
    number: number;
  }[];
}

export interface PaginableList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
