import React, {useContext, useEffect} from 'react';
import classes from '../styles/modal.module.scss';
import {Context} from "../context";

const Modal = ({modalActive, setModalActive}) => {
    const types = ['normal', 'fighting', 'flying', 'poison', 'ground',
        'rock', 'bug', 'ghost', 'steel', 'fire', 'water',
        'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy',
        'unknown', 'shadow'];

    const {selectedTypes, setSelectedTypes} = useContext(Context);

    const setType = (type) => {
        setSelectedTypes(prev => [...prev, type]);
    }

    const unsetType = (type) => {
        setSelectedTypes(selectedTypes.filter(item => item !== type));
    }

    useEffect(() => {
        console.log('selected types: ', selectedTypes);
    }, [selectedTypes]);

    return (
        <div className={`${classes.modalWindow} ${modalActive && classes.active}`} onClick={() => setModalActive(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                <div>
                    <h1>Select pokemons types</h1>
                    <select
                        name="pets"
                        id="pet-select"
                        onChange={e => e.target.value !== "" && setType(e.target.value)}
                    >
                        <option value="">None</option>
                        {
                            types.map(type => (
                                <option value={type} disabled={type === 'unknown' && true}>{type}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={classes.selectedTypes}>
                    Selected types:
                    {
                        selectedTypes &&
                        selectedTypes.map(selected => (
                            <div className={classes.type}>
                                <div onClick={() => unsetType(selected)}>&#x2613;</div>
                                <div>{selected}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;