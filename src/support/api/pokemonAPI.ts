/* eslint-disable no-undef */
import querystring from "querystring";
import type {
  AbilityResponse,
  PokemonResponse,
  PokemonSpeciesResponse,
  ResourceList,
  TypeResponse
} from "./interfaces/pokemonApi";
import type { Pokemon, PaginableList } from "interfaces/pokemon";
import { parsePokemon } from "./parsers/pokemon";

const baseUrl = "https://pokeapi.co/api/v2/";

interface Cache {
  [url: string]: any;
}

const cache: Cache = {};

function getFullUrl(
  path: string,
  parameters?: string | Record<string, string>
) {
  let parameterString = "";
  if (typeof parameters === "string") {
    parameterString = parameters;
  } else if (parameters) {
    parameterString = querystring.stringify(parameters);
  }
  return `${baseUrl}${path}${parameterString ? `?${parameterString}` : ""}`;
}

async function fetchWithCache(url: string, options?: RequestInit) {
  const cachedResponse = cache[url];

  if (cachedResponse) {
    return cachedResponse;
  }

  const promise = fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json().then((body) => {
        cache[url] = body;
        return body;
      });
    } else {
      throw new Error(
        `Request to ${url} has failed, status code: ${response.status}`
      );
    }
  });
  cache[url] = promise;
  return promise;
}

async function fetchPokeApi<T>(
  pathOrUrl: string,
  parameters?: string | Record<string, string>,
  options?: RequestInit
): Promise<T> {
  let url;
  if (pathOrUrl.startsWith("http")) {
    url = pathOrUrl;
  } else {
    url = getFullUrl(pathOrUrl, parameters);
  }

  const response = (await fetchWithCache(url, options)) as T;
  return response;
}

export async function fetchPokemonSpeciesByURL(
  pathOrUrl: string
): Promise<Pokemon> {
  const pokemonSpeciesResponse = await fetchPokeApi<PokemonSpeciesResponse>(
    pathOrUrl
  );
  const { varieties } = pokemonSpeciesResponse;
  const defaultPokemonResource =
    varieties.find((item) => item.is_default) || varieties[0];

  if (!defaultPokemonResource) {
    throw new Error(
      `Could not find a default pokemon associated with ${pokemonSpeciesResponse.name}`
    );
  }

  const url = defaultPokemonResource.pokemon.url;
  const pokemonResponse = await fetchPokeApi<PokemonResponse>(url);

  const typesPromise = Promise.all(
    pokemonResponse.types.map((item) =>
      fetchPokeApi<TypeResponse>(item.type.url)
    )
  );
  const abilitiesPromise = Promise.all(
    pokemonResponse.abilities.map((item) =>
      fetchPokeApi<AbilityResponse>(item.ability.url)
    )
  );

  const [typeResponses, abilityResponses] = await Promise.all([
    typesPromise,
    abilitiesPromise
  ]);

  return parsePokemon(
    pokemonResponse,
    pokemonSpeciesResponse,
    typeResponses,
    abilityResponses
  );
}

export async function fetchPokemonSpeciesByID(
  id: string | number
): Promise<Pokemon> {
  return fetchPokemonSpeciesByURL(`pokemon-species/${id}`);
}

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 9
): Promise<PaginableList<Pokemon>> {
  const response = await fetchPokeApi<ResourceList>("pokemon-species", {
    limit: String(limit),
    offset: String(offset)
  });
  const pokemon = await Promise.all(
    response.results.map((item) => fetchPokemonSpeciesByURL(item.url))
  );

  return {
    count: response.count,
    next: response.next,
    previous: response.previous,
    results: pokemon
  };
}
