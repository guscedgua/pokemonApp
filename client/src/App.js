import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={Create} />
        {/* <Route exact path="/pokemons/:id" component={Details} /> */}
        <Route
          exact
          path="/pokemons/:id"
          render={({ match }) => <Details pokemonId={match.params.id} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
