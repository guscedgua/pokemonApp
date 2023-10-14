import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterCreatedPokemons,
  orderByName,
  orderByAttack,
} from "../../store/actions";
import Cards from "../Cards/Cards";
import { Fragment } from "react";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedPokemons(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.background}>
      <NavBar />
      <h1>Pokemon PI</h1>
      <div>

        <div className={styles.buttons}>
        <SearchBar />         
      
        </div>
        <div className={styles.buttons}>
          <select onChange={(e) => handleSort(e)} className={styles.options}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
          <select onChange={(e) => handleAttack(e)} className={styles.options}>
            <option value="asc">Menos ataque</option>
            <option value="desc">Más ataque</option>
          </select>
          <select
            onChange={(e) => handleFilterTypes(e)}
            className={styles.options}
          >
            <option value="all">Todos</option>
            <option value="normal">Normal</option>
            <option value="fighting">Luchador</option>
            <option value="flying">Volador</option>
            <option value="poison">Veneno</option>
            <option value="ground">Tierra</option>
            <option value="rock">Roca</option>
            <option value="bug">Bicho</option>
            <option value="ghost">Fantasma</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="steel">Acero</option>
            <option value="grass">Planta</option>
            <option value="electric">Eléctrico</option>
            <option value="psychic">Psíquico</option>
            <option value="ice">Hielo</option>
            <option value="dragon">Dragón</option>
            <option value="dark">Siniestro</option>
            <option value="fairy">Hada</option>
            <option value="unknown">Desconocido</option>
            <option value="shadow">Sombra</option>
          </select>
          <select
            onChange={(e) => handleFilterCreated(e)}
            className={styles.options}
          >
            <option value="all">Todos</option>
            <option value="exist">Existentes</option>
            <option value="created">Creados</option>
          </select>
        </div>
    <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={styles.button}
          >
            Recargar pokemons
          </button>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          pagination={pagination}
        />
        {currentPokemons?.map((elem) => {
          return (
            <>
              <Cards
                id={elem.id}
                name={elem.name}
                image={elem.image}
                types={elem.types}
                key={elem.id}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
