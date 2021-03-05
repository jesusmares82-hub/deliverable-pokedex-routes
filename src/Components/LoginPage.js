import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Button from "react-bootstrap/Button";
import { RiLoginCircleLine } from "react-icons/ri";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import pokemonlogo from "../img/pokemon.png";
import psyduck from "../img/psyduck.png";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const { signIn, setUser } = useAuth();

  return (
    <div className="my-auto font-family">
      <img className="mx-auto" src={pokemonlogo} alt="pokemon-logo" />
      <img width={"200px"} className="mx-auto" src={psyduck} alt="psyduck" />
      <h2 className="text-center">What Kind Of Pokemon Trainer Are You?</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type Your Pokemon Trainer Name..."
          value={userName}
          onChange={(e) => {
            const value = e.target.value;
            setUserName(value);
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-primary"
            onClick={() =>
              signIn(() => {
                history.push(`/pokedex`);
                setUser(userName);
              })
            }
          >
            <RiLoginCircleLine /> Login
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default LoginPage;
