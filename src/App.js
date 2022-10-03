import React, {createContext, useState} from "react";
import Pokemons from "./components/Pokemons";
import {Context} from "./context";
import Controls from "./components/Controls";

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [firstItem, setFirstItem] = useState(1);
    const [searchedPokemon, setSearchedPokemon] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);

  return (
    <Context.Provider value={{
        currentPage,
        setCurrentPage,
        firstItem,
        setFirstItem,
        searchedPokemon,
        setSearchedPokemon,
        notFound,
        setNotFound,
        selectedTypes,
        setSelectedTypes
    }}>
      <Pokemons/>
    </Context.Provider>
  );
}

export default App;
