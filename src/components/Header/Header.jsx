import { NavLink } from "react-router-dom";

import { Container } from "../Container/Container";
import s from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.header__container}>
          <nav className={s.header__nav}>
            <NavLink to="/" className={({ isActive }) => (isActive ? `${s.header__link} ${s["header__link--active"]}` : s.header__link)}>
              Home
            </NavLink>

            <NavLink to="/movies" className={({ isActive }) => (isActive ? `${s.header__link} ${s["header__link--active"]}` : s.header__link)}>
              Movies
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
};
