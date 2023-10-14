import React from "react";
import { Link } from "react-router-dom";
import {
  container,
  background,
  nameStyle,
  typeStyle,
  buttonStyle,
} from "./Card.module.css";

export default function Card({ id, name, image, types }) {
  return (
    <div className={container}>
      <Link to={"/pokemons/" + id}>
        <img
          src={image}
          alt="not found"
          width="200px"
          height="200px"
          className={background}
        />
      </Link>

      <h3 className={nameStyle}>{name}</h3>
      {types.map((type) => (
        <h5 className={typeStyle}>{type}</h5>
      ))}
    </div>
  );
}
