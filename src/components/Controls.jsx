import React, {useContext, useEffect, useState} from 'react';
import classes from '../styles/controls.module.scss';
import {Context} from "../context";

const Controls = () => {
    const [searchText, setSearchText] = useState('');
    const {setSearchedPokemon, setNotFound} = useContext(Context);

    const findPokemon = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    setNotFound(true);
                }
            })
            .then(json => {
                setSearchedPokemon(json);
            })
    }

    useEffect(() => {
        if (searchText.trim() == '') {
            setSearchedPokemon([]);
            setNotFound(false);
        }
    }, [searchText]);

    return (
        <div className={classes.container}>
            <div className={classes.controlsWrapper}>
                <input
                    type="text"
                    placeholder={'Pikachu'}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && findPokemon()}
                />
                <button onClick={findPokemon}>Search</button>
            </div>
        </div>
    );
};

export default Controls;