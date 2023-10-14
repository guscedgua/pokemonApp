import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../store/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Create.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Es necesario indicar el nombre del Pokemon";
  } else if (!input.health) {
    errors.health = "Es necesario indicar la vida del Pokemon";
  } else if (!input.attack) {
    errors.attack = "Es necesario indicar el ataque del Pokemon";
  } else if (!input.defense) {
    errors.defense = "Es necesario indicar la defensa del Pokemon";
  } else if (!input.speed) {
    errors.speed = "Es necesario indicar la velocidad del Pokemon";
  } else if (!input.height) {
    errors.height = "Es necesario indicar la altura del Pokemon";
  } else if (!input.weight) {
    errors.weight = "Es necesario indicar el peso del Pokemon";
  } else if (!input.types) {
    errors.types = "Es necesario seleccionar al menos un tipo del Pokemon";
  }

  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      console.log(e.target.name);
      setInput({
        ...input,
        types: [...input.types, e.target.name],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert(`¡El pokemon ${input.name} se ha creado exitosamente!`);
    console.log(input);

    setInput({
      name: "",
      health: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });

    history.push("/home");
  }

  return (
    <div className={styles.background}>
      <NavBar />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.card}>
        <h1>Crea tu pokemon</h1>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Vida:</label>
          <input
            type="number"
            value={input.health}
            name="health"
            onChange={handleChange}
          />
          {errors.health && <p className="error">{errors.health}</p>}
        </div>
        <div>
          <label>Ataque:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={handleChange}
          />
          {errors.attack && <p className="error">{errors.attack}</p>}
        </div>
        <div>
          <label>Defensa:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={handleChange}
          />
          {errors.defense && <p className="error">{errors.defense}</p>}
        </div>
        <div>
          <label>Velocidad:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={handleChange}
          />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </div>
        <div>
          <label>Altura:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={handleChange}
          />
          {errors.height && <p className="error">{errors.height}</p>}
        </div>
        <div>
          <label>Peso:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={handleChange}
          />
          {errors.weight && <p className="error">{errors.weight}</p>}
        </div>
        <div>
          <label for="url">URL de la imagen:</label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className={styles.margin}>
          <label>Tipo:</label>
          <div className={styles.display}>
            <label>
              <input
                type="checkbox"
                name="normal"
                value={1}
                onChange={(e) => handleCheck(e)}
              />
              Normal
            </label>
            <label>
              <input
                type="checkbox"
                name="fighting"
                value={2}
                onChange={(e) => handleCheck(e)}
              />
              Lucha
            </label>
            <label>
              <input
                type="checkbox"
                name="flying"
                value={3}
                onChange={(e) => handleCheck(e)}
              />
              Volador
            </label>
            <label>
              <input
                type="checkbox"
                name="poison"
                value={4}
                onChange={(e) => handleCheck(e)}
              />
              Veneno
            </label>
            <label>
              <input
                type="checkbox"
                name="ground"
                value={5}
                onChange={(e) => handleCheck(e)}
              />
              Tierra
            </label>
          </div>
          <div className={styles.display}>
            <label>
              <input
                type="checkbox"
                name="rock"
                value={6}
                onChange={(e) => handleCheck(e)}
              />
              Roca
            </label>
            <label>
              <input
                type="checkbox"
                name="bug"
                value={7}
                onChange={(e) => handleCheck(e)}
              />
              Bicho
            </label>
            <label>
              <input
                type="checkbox"
                name="ghost"
                value={8}
                onChange={(e) => handleCheck(e)}
              />
              Fantasma
            </label>
            <label>
              <input
                type="checkbox"
                name="steel"
                value={9}
                onChange={(e) => handleCheck(e)}
              />
              Acero
            </label>
            <label>
              <input
                type="checkbox"
                name="fire"
                value={10}
                onChange={(e) => handleCheck(e)}
              />
              Fuego
            </label>
          </div>
          <div className={styles.display}>
            <label>
              <input
                type="checkbox"
                name="water"
                value={11}
                onChange={(e) => handleCheck(e)}
              />
              Agua
            </label>
            <label>
              <input
                type="checkbox"
                name="grass"
                value={12}
                onChange={(e) => handleCheck(e)}
              />
              Planta
            </label>
            <label>
              <input
                type="checkbox"
                name="electric"
                value={13}
                onChange={(e) => handleCheck(e)}
              />
              Eléctrico
            </label>
            <label>
              <input
                type="checkbox"
                name="psychic"
                value={14}
                onChange={(e) => handleCheck(e)}
              />
              Psíquico
            </label>
            <label>
              <input
                type="checkbox"
                name="ice"
                value={15}
                onChange={(e) => handleCheck(e)}
              />
              Hielo
            </label>
          </div>
          <div className={styles.display}>
            <label>
              <input
                type="checkbox"
                name="dragon"
                value={16}
                onChange={(e) => handleCheck(e)}
              />
              Dragón
            </label>
            <label>
              <input
                type="checkbox"
                name="dark"
                value={17}
                onChange={(e) => handleCheck(e)}
              />
              Siniestro
            </label>
            <label>
              <input
                type="checkbox"
                name="fairy"
                value={18}
                onChange={(e) => handleCheck(e)}
              />
              Hada
            </label>
            <label>
              <input
                type="checkbox"
                name="unknow"
                value={19}
                onChange={(e) => handleCheck(e)}
              />
              Desconocido
            </label>
            <label>
              <input
                type="checkbox"
                name="shadow"
                value={20}
                onChange={(e) => handleCheck(e)}
              />
              Sombra
            </label>
          </div>
        </div>
        <button type="submit" className={styles.buttons}>
          Crear
        </button>
      </form>
    </div>
  );
}
