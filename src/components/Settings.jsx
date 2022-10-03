import React, {useContext} from 'react';
import classes from "../styles/settings.module.scss";
import {Context} from "../context";

const Settings = ({setItems, itemsPerPage, setModalActive}) => {
    const {currentPage, setCurrentPage, setFirstItem, selectedTypes, setSelectedTypes} = useContext(Context);

    const setItemsPerPage = (count) => {
        setItems(count);
        if (currentPage > 1) {
            setCurrentPage(1);
            setFirstItem(1);
        }
    }

    const unsetType = (type) => {
        setSelectedTypes(selectedTypes.filter(item => item !== type));
    }

    return (
        <>
            <div className={classes.settings}>
                <div className={classes.openModal} onClick={() => setModalActive(true)}>
                    Filter pokemons
                </div>
                <div className={classes.cardsCount}>
                    <div
                        onClick={() => setItemsPerPage(10)}
                        className={itemsPerPage === 10 && classes.selectedCount}
                    >10</div>
                    <span>|</span>
                    <div
                        onClick={() => setItemsPerPage(20)}
                        className={itemsPerPage === 20 && classes.selectedCount}
                    >20</div>
                    <span>|</span>
                    <div
                        onClick={() => setItemsPerPage(50)}
                        className={itemsPerPage === 50 && classes.selectedCount}
                    >50</div>
                </div>
            </div>
            <div className={`${classes.selectedTypes} ${!selectedTypes.length && classes.empty}`}>
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
        </>
    );
};

export default Settings;