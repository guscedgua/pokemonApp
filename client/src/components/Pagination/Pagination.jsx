import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  pokemonsPerPage,
  allPokemons,
  pagination,
}) {
  const pageNumbers = [];

  // Acá se pushean la cantidad de páginas que va a tener según el número de pokemons (40) dividio la cantidad de pokemons por página (12)
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.container}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className={styles.pagination}>
              <a onClick={() => pagination(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
