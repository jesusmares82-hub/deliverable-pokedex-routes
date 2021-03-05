import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";
import Spinner from "./Spiner";

const PokemonDetails = () => {
  const { id } = useParams();
  let history = useHistory();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);

  const [hasData, setHasData] = useState(false);

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
  }, [id]);

  return (
    <div className="text-center poke-details">
      {hasData ? (
        pokemon && (
          <>
            <Container>
              <Row>
                <Col className="col-md-2 mt-5">
                  <img
                    width="150px"
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                  />

                  <h2>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h2>

                  <h4>
                    {" "}
                    Id: <span>{id}</span>{" "}
                  </h4>

                  <h4>
                    {" "}
                    Height: <span>{pokemon.height / 10} M</span>{" "}
                  </h4>

                  <h4>
                    {" "}
                    Order: <span>{pokemon.order}</span>{" "}
                  </h4>
                  <h4>
                    {" "}
                    Weight: <span>{pokemon.weight / 10} Kg</span>{" "}
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
                </Col>
                <Col>
                  <h3> Moves: </h3>

                  <h6>
                    <strong>
                      {pokemonMoves &&
                        pokemonMoves.map((value, index) => {
                          return (
                            <span
                              className="card-moves"
                              key={value.move.name + index}
                            >
                              {" "}
                              {value.move.name.charAt(0).toUpperCase() +
                                value.move.name.slice(1)}{" "}
                            </span>
                          );
                        })}
                    </strong>
                  </h6>
                </Col>
              </Row>
            </Container>
          </>
        )
      ) : (
        <Spinner />
      )}

      <Container>
        <Row>
          <Col>
            <Button
              className="mb-3"
              variant="outline-info"
              onClick={() => history.goBack()}
            >
              <TiArrowBackOutline /> Back
            </Button>{" "}
          </Col>
          <Col>
            {" "}
            <Link
              to={{
                pathname: `/pokedex/pokemon/${id}/encounters`,
                id: id,
              }}
            >
              <h5>
                {" "}
                Encounters <TiArrowForwardOutline />
              </h5>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonDetails;
