import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { GiPawPrint } from "react-icons/gi";
import { BiGlassesAlt } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "./Spiner";

const EncountersPokemon = () => {
  let { id } = useParams();

  let history = useHistory();
  let encounters = id;
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState([]);

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
      .then((dataApi) => {
        setData(dataApi);
        setHasData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [encounters]);

  useEffect(() => {
    if (data) {
      const renderLocation = data.data.map((values, index) => (
        <div key={values + index}>
          <span className="card-encounters text-center">
            <FaMapMarkedAlt /> Location area: {values.location_area.name}
          </span>
        </div>
      ));
      setDataRender(renderLocation);
    }
  }, [data]);

  return (
    <div>
      <h2>
        {" "}
        {`Where to find it? `} <GiPawPrint /> <BiGlassesAlt />
      </h2>
      {hasData ? (
        <Container>
          <Row>
            <Col className="col-lg-3 mt-3">
              {" "}
              {dataRender && dataRender.length > 0 ? (
                <h5>{dataRender && dataRender}</h5>
              ) : (
                <h5 className="mt-3 mb-5">
                  {" "}
                  <SiOpenstreetmap /> Location not found
                </h5>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner />
      )}
      <Button
        className="mt-5 mb-3"
        variant="outline-info"
        onClick={() => history.goBack()}
      >
        <TiArrowBackOutline /> Back
      </Button>{" "}
    </div>
  );
};

export default EncountersPokemon;
