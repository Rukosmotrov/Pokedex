import React from 'react';
import Pokemon from "./Pokemon";

const PokemonsList = ({pokemons, searchedPokemon}) => {
    return (
        <>
            {
                searchedPokemon.id
                ?
                    <Pokemon
                        key={searchedPokemon.id}
                        pokemon={searchedPokemon}
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${searchedPokemon.id}.png`}
                    />
                    :
                    pokemons.map(pokemon =>
                    <Pokemon
                        key={pokemon.id}
                        pokemon={pokemon}
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    />
                )
            }
        </>
    );
};

export default PokemonsList;