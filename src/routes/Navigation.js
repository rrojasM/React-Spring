import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes
} from 'react-router-dom';
import '../App.css';

import logo from '../logo.svg';
import { RegistrarUsuario } from '../pages/RegistrarUsuario';
import { CrearUsuario } from '../pages/CrearUsuario';
import { Home } from '../pages/Home';

export const Navigation = () => {
  return (
    <Router>
      <div className="main-layout">
        <nav>
          <img src={logo} alt="React Logo" />
          <ul>
            <li>
              <NavLink to="/" activeClassName="nav-active">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/registrar" activeClassName="nav-active">Registrar</NavLink>
            </li>
            <li>
              <NavLink to="/consultar" activeClassName="nav-active">Consultar Usuarios</NavLink>
            </li>

          </ul>
        </nav>
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/registrar" element={<RegistrarUsuario />} />
          <Route exact path="/consultar" element={<CrearUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

