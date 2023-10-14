import React from "react";
import { Link } from "react-router-dom";
import { header, logo, ul, li, margin } from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div>
      <header className={header}>
        <Link to="/" className={logo}>
          <img src="https://i.imgur.com/q1zJua5.png" alt="" />
        </Link>
        <ul className={ul}>
          <li className={li}>
            <Link to="/home" className={margin}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/create">Crear</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
