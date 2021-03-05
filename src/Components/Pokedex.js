import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spiner";
import { Link } from "react-router-dom";
import grass from "../img/grass.png";
import poison from "../img/poison.png";
import bug from "../img/bug.png";
import dragon from "../img/dragon.png";
import electric from "../img/electric.png";
import ghost from "../img/ghost.png";
import fire from "../img/fire.png";
import fairy from "../img/fairy.png";
import ice from "../img/ice.png";
import fighting from "../img/fighting.png";
import normal from "../img/normal.png";
import psychic from "../img/psychic.png";
import rock from "../img/rock.png";
import dark from "../img/dark.png";
import ground from "../img/ground.png";
import flying from "../img/flying.png";
import steel from "../img/steel.png";
import water from "../img/water.png";

const Pokedex = ({ name, url, type }) => {
  const [pokemon, setPokemon] = useState(null);
  const [identifyPokemon, setIdentifyPokemon] = useState([]);
  const [pokemonShiny, setPokemonShiny] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState(null);
  const [imageShown, setImageShown] = useState(pokemon);
  const [pokemonStats, setPokemonStats] = useState([]);

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get(url, { cancelToken: source.token }).then((res) => {
          setPokemon(res.data.sprites.front_default);
          setPokemonTypes(res.data.types);
          setPokemonShiny(
            res.data.sprites.front_shiny
              ? res.data.sprites.front_shiny
              : res.data.sprites.front_default
          );
          setImageShown(res.data.sprites.front_default);
          setIdentifyPokemon(res.data);
          setPokemonStats(res.data.stats);
          setHasData(true);
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
  }, [url]);

  return (
    <div
      className={
        type === "electric"
          ? "my-card electric"
          : type === "steel"
          ? "my-card steel"
          : type === "water"
          ? "my-card water"
          : type === "bug"
          ? "my-card bug"
          : type === "grass"
          ? "my-card grass"
          : type === "dragon"
          ? "my-card dragon"
          : type === "fire"
          ? "my-card fire"
          : type === "ice"
          ? "my-card ice"
          : type === "normal"
          ? "my-card normal"
          : type === "flying"
          ? "my-card flying"
          : type === "rock"
          ? "my-card rock"
          : type === "psychic"
          ? "my-card psychic"
          : type === "fairy"
          ? "my-card fairy"
          : type === "ground"
          ? "my-card ground"
          : type === "poison"
          ? "my-card poison"
          : type === "fighting"
          ? "my-card fighting"
          : type === "dark"
          ? "my-card dark"
          : type === "ghost"
          ? "my-card ghost"
          : type === "shadow"
          ? "my-card shadow"
          : type === "unknow"
          ? "my-card unknow"
          : "my-card normal"
      }
    >
      {hasData ? (
        <>
          <div className="icon-type">
            {pokemonTypes &&
              pokemonTypes.map((value, index) => {
                return (
                  <img
                    key={index + value.type.name}
                    width="20px"
                    src={
                      value.type.name === "grass"
                        ? grass
                        : value.type.name === "poison"
                        ? poison
                        : value.type.name === "bug"
                        ? bug
                        : value.type.name === "steel"
                        ? steel
                        : value.type.name === "water"
                        ? water
                        : value.type.name === "dragon"
                        ? dragon
                        : value.type.name === "electric"
                        ? electric
                        : value.type.name === "ghost"
                        ? ghost
                        : value.type.name === "fire"
                        ? fire
                        : value.type.name === "fairy"
                        ? fairy
                        : value.type.name === "ice"
                        ? ice
                        : value.type.name === "fighting"
                        ? fighting
                        : value.type.name === "normal"
                        ? normal
                        : value.type.name === "psychic"
                        ? psychic
                        : value.type.name === "rock"
                        ? rock
                        : value.type.name === "ground"
                        ? ground
                        : value.type.name === "flying"
                        ? flying
                        : value.type.name === "dark"
                        ? dark
                        : normal
                    }
                    alt={name}
                  />
                );
              })}
          </div>
          <img
            className="img-container"
            width="100px"
            src={imageShown}
            alt={name}
            onMouseOver={() => setImageShown(pokemonShiny)}
            onMouseLeave={() => setImageShown(pokemon)}
          />
          {identifyPokemon && (
            <span className="number">#{identifyPokemon.id}</span>
          )}
          <h5
            className="font-family"
            style={{
              margin: 3,
            }}
          >
            <Link to={`/pokedex/pokemon/${identifyPokemon.id}`}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </h5>
          <h6 className="font-family">
            <strong>
              Types:
              {pokemonTypes &&
                pokemonTypes.map((value, index) => {
                  return (
                    <span key={value.type.name + index}>
                      {index === 1 ? " /" : " "}{" "}
                      {value.type.name.charAt(0).toUpperCase() +
                        value.type.name.slice(1)}{" "}
                    </span>
                  );
                })}
            </strong>
          </h6>
          <div className="bg-color-white pl-2 pr-2 mt-4">
            <h6 className="font-family text-center ">
              <strong>
                {pokemonStats &&
                  pokemonStats.map((value, index) => {
                    return (
                      <span key={value.stat.name + index}>
                        {index >= 1 ? " /" : " "}{" "}
                        {value.stat.name.charAt(0).toUpperCase() +
                          value.stat.name.slice(1)}{" "}
                        {value.base_stat}{" "}
                      </span>
                    );
                  })}
              </strong>
            </h6>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Pokedex;
