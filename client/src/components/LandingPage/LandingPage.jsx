import React from "react";
import { Link } from "react-router-dom";
import {
  main,
  logoContainer,
  logo,
  text,
  centerOnPage,
  pokeball,
  pokeballButton,
  backgroundText,
} from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={main}>
      <div className={logoContainer}>
        <div className={backgroundText}>
          <p className={text}>¡BIENVENIDO!</p>
          <p className={text}>
            PARA INGRESAR EN LA POKEDEX PRESIONA LA POKEBOLA
          </p>
        </div>
      </div>
      <div className={centerOnPage}>
        <div className={pokeball}>
          <Link to="/home">
            <div className={pokeballButton}></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
