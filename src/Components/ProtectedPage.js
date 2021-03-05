import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProtectedPage = ({ children, ...props }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setPokemon(res.data);
            setPokemonAbilities(res.data.abilities);
            setPokemonMoves(res.data.moves);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="text-center">
      {pokemon && (
        <>
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img
            width="150px"
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
          <h4>
            {" "}
            Id: <span>{id}</span>{" "}
          </h4>

          <h4>
            {" "}
            Height: <span>{pokemon.height} Hexogramos</span>{" "}
          </h4>

          <h4>
            {" "}
            Order: <span>{pokemon.order}</span>{" "}
          </h4>
          <h4>
            {" "}
            Weight: <span>{pokemon.weight}</span>{" "}
          </h4>

          <h4> Abilities: </h4>
          <h6>
            <strong>
              {pokemonAbilities &&
                pokemonAbilities.map((value, index) => {
                  return (
                    <span key={value.ability.name + index}>
                      {index === 1 ? " |" : " "}{" "}
                      {value.ability.name.charAt(0).toUpperCase() +
                        value.ability.name.slice(1)}{" "}
                    </span>
                  );
                })}
            </strong>
          </h6>
          <h4> Moves: </h4>
          <h6>
            <strong>
              {pokemonMoves &&
                pokemonMoves.map((value, index) => {
                  return (
                    <span key={value.move.name + index}>
                      {index === 1 ? " |" : " "}{" "}
                      {value.move.name.charAt(0).toUpperCase() +
                        value.move.name.slice(1)}{" "}
                    </span>
                  );
                })}
            </strong>
          </h6>
        </>
      )}

      <p>
        <Link
          to={{
            pathname: `/pokedex/pokemon/${id}/encounters`,
            id: id,
          }}
        >
          Encounters
        </Link>
      </p>

      <p>
        <Link to="/pokedex">👈🏻 Back</Link>
      </p>
    </div>
  );
};

export default ProtectedPage;
