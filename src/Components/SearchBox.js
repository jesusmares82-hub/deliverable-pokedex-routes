import React, { useEffect, useState } from "react";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchBox = ({
  handleSearchTermName,
  handleSearchTermType,
  handleClearTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    try {
      axios.get(" https://pokeapi.co/api/v2/type").then((res) => {
        setTypes(res.data.results);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

  return (
    <div>
      <Form>
        <Form.Group className="pr-5 pl-5">
          <Form.Label>Filter pokemons by types:</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={(e) => {
              handleSearchTermType(e.target.value.toLowerCase());
            }}
            onFocus={() => handleClearTerm()}
          >
            <option>Select a type</option>
            {types.map((value, index) => {
              return (
                <option key={value.name + index}>
                  {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>
      <Form.Label>Search pokemon by name or id:</Form.Label>
      <InputGroup className="pr-5 pl-5">
        <FormControl
          id="poke-search"
          className="custom-select"
          placeholder="Pokemon name/id..."
          value={searchTerm}
          style={{
            width: "15rem",
            backgroundColor: "#f4f9f9",
          }}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value.toLowerCase());
          }}
          onFocus={() => handleClearTerm()}
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            onClick={() => handleSearchTermName(searchTerm, setSearchTerm)}
          >
            Search
          </Button>
          <Button variant="danger" onClick={() => handleClearTerm()}>
            Clear
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default SearchBox;
