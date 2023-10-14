import React from "react";
import Card from "../Card/Card";
import { container } from "./Cards.module.css";

export default function Cards({ id, name, image, types }) {
  return (
    <div className={container}>
      <Card id={id} name={name} image={image} types={types} key={id} />
    </div>
  );
}
