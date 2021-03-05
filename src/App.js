import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AuthButtons from "./Components/AuthButtons";
import LoginPage from "./Components/LoginPage";
import PublicPage from "./Components/PublicPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import PokemonDetails from "./Components/PokemonDetails";
import EncountersPokemon from "./Components/EncountersPokemon";
import Home from "./Components/Home";
import { ProvideAuth } from "./Provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButtons />

          <Switch>
            <ProtectedRoute exact path="/pokedex">
              <PublicPage />
            </ProtectedRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute exact path="/pokedex/pokemon/:id">
              <PokemonDetails />
            </ProtectedRoute>
            <ProtectedRoute exact path={"/pokedex/pokemon/:id/encounters"}>
              <EncountersPokemon />
            </ProtectedRoute>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
