import React from "react";
import { Link } from "react-router-dom";
import pokemon from "../img/pokemon.png";

const Home = () => {
  return (
    <div className="my-auto font-family mt-5">
      <img
        className="logo-center"
        width={"200px"}
        src={pokemon}
        alt="pokemon-logo"
      />
      <h2 className="text-center">Welcome to Pokedex by Squad 12.</h2>
      <p className="text-center">Academlo, March 2020.</p>
      <Link className="btn-login-center btn btn-primary" to={`/login`} replace>
        {" "}
        Login{" "}
      </Link>
    </div>
  );
};

export default Home;
