import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailedPokemon } from "../../store/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Details.module.css";

export default function Details({ pokemonId }) {
  const dispatch = useDispatch();
  const detailedPokemon = useSelector((state) => state.details);
  console.log(pokemonId);

  useEffect(() => {
    dispatch(getDetailedPokemon(pokemonId));
  }, [pokemonId]);

  return (
    <div className={styles.container}>
      <NavBar />
      {detailedPokemon.length > 0 ? (
        <div className={styles.card}>
          <div>
            <h2 className={styles.nameId}>{detailedPokemon[0].name} </h2>
            <h2 className={styles.nameId}>ID: {detailedPokemon[0].id} </h2>
            <img src={detailedPokemon[0].image} className={styles.image} />
          </div>
          <div>
            <p>Vida {detailedPokemon[0].health} </p>
            <p>Ataque {detailedPokemon[0].attack} </p>
            <p>Defensa {detailedPokemon[0].defense} </p>
            <p>Velocidad {detailedPokemon[0].speed} </p>
            <p>Altura {detailedPokemon[0].height} </p>
            <p>Peso {detailedPokemon[0].weight} </p>
            <p>
              Tipo{" "}
              {detailedPokemon[0].types.map((elem) => (
                <span className={styles.span}>{elem + " "}</span>
              ))}{" "}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.padding}>
          <img src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif" />
          <p>Cargando...</p>
        </div>
      )}
    </div>
  );
}
