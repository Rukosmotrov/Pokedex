import React, {useState, useEffect, useContext} from 'react';
import Pokemon from "./Pokemon";
import Loader from "./Loader";
import classes from '../styles/pokemons.module.scss';
import Pagination from "./Pagination";
import {Context} from "../context";
import Controls from "./Controls";
import PokemonsList from "./PokemonsList";
import Modal from "./Modal";
import Settings from "./Settings";

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalActive, setModalActive] = useState(false);
    const {currentPage, firstItem, searchedPokemon, notFound, selectedTypes} = useContext(Context);

    const getPokemons = async () => {
        setIsLoading(true);
        setPokemons([]);
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(res => res.json())
            .then(json => setTotalItems(json.count))


        if (!selectedTypes.length) {
            for (let i = firstItem; i !== itemsPerPage + firstItem; i++) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(res => res.json())
                    .then(json => setPokemons(prev => [...prev, json]))
            }
        } else {
                for (let i = 0; i < selectedTypes.length; i++) {
                    let count = 0;
                    await fetch(`https://pokeapi.co/api/v2/type/${selectedTypes[i]}`)
                        .then(res => res.json())
                        .then(async json => {
                            for (let j = firstItem; j !== itemsPerPage + firstItem; j++) {
                                if (count < Math.ceil(itemsPerPage / selectedTypes.length)) {
                                    await fetch(`https://pokeapi.co/api/v2/pokemon/${json.pokemon[j].pokemon.name}`)
                                        .then(res => res.ok && res.json())
                                        .then(json => {
                                            setPokemons(prev => [...prev, json]);
                                        })
                                    count++;
                                }
                            }
                        })
                }
        }
        setIsLoading(false);
    }

    const setItems = (count) => {
        setItemsPerPage(count);
    }

    useEffect(() => {
        getPokemons();
    }, [currentPage, itemsPerPage, selectedTypes]);

    if (isLoading) {
        return (
            <Loader/>
        );
    } else {
        return (
            <div className={classes.container}>
                <Controls/>
                <Settings
                    setItems={setItems}
                    itemsPerPage={itemsPerPage}
                    setModalActive={setModalActive}
                />
                <Modal modalActive={modalActive} setModalActive={setModalActive}/>
                <div className={classes.pokemonsContainer}>
                    {
                        !notFound
                            ?
                            <PokemonsList
                                pokemons={pokemons.sort((a, b) => a.id - b.id)}
                                searchedPokemon={searchedPokemon}
                            />
                            : <h1>Pokemon not found</h1>
                    }
                </div>
                {!notFound && !searchedPokemon.id && <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems}/>}
            </div>
        );
    }
};

export default Pokemons;