import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import Pokedex from "pages/Pokedex";
import PokemonDetails from "pages/PokemonDetails";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome Pokemon Trainers!</h1>
        <nav>
          <NavLink
            to="/"
            activeStyle={{
              display: "none",
            }}
            exact
          >
            Home
          </NavLink>
        </nav>
        <Switch>
          <Route path="/pokemon/:id">
            <PokemonDetails />
          </Route>
          <Route path="/">
            <Pokedex />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
