import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { GiConsoleController, GiPawPrint } from "react-icons/gi";
import { BiGlassesAlt } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "./Spiner";
import PokemonJhoto from "../img/PokemonJohto.mp3";
import ReactAudioPlayer from "react-audio-player";
import ReactPaginate from "react-paginate";

const EncountersPokemon = () => {
  let { id } = useParams();

  let history = useHistory();
  let encounters = id;
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState([]);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);

  const [hasData, setHasData] = useState(false);

  /*useEffect(() => {
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
  }, [data, offset, perPage]);*/

  useEffect(() => {
    if (encounters) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
        .then((res) => {
          //console.log(res.data);
          const data = res.data;
          const slices = data.slice(offset, offset + perPage);
          const postData = slices.map((values, index) => (
            <div key={values + index}>
              <span className="card-encounters text-center">
                <FaMapMarkedAlt /> Location area: {values.location_area.name}
              </span>
            </div>
          ));
          setData(postData);
          setPageCount(Math.ceil(data.length / perPage));
          setHasData(true);
        });
    }
  }, [encounters, offset, perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setOffset(selectedPage * perPage);
  };

  return (
    <>
      <ReactAudioPlayer src={PokemonJhoto} autoPlay />
      <Container>
        <Row>
          <Col className="col-md-2">
            <Button variant="warning" onClick={() => history.goBack()}>
              <TiArrowBackOutline /> Back
            </Button>{" "}
          </Col>
          <Col className="col-md-10">
            <h2 className="text-center font-secondary">
              {`Where to find it? `} <GiPawPrint /> <BiGlassesAlt />
            </h2>
          </Col>
        </Row>
      </Container>

      <div className="font-secondary">
        {hasData ? (
          <Container>
            <Row className="d-inline-block">
              <Col className="col-md-12 mt-5 padding-custom-encounters">
                <ReactPaginate
                  className="color-text-a text-center"
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={""}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={9}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />{" "}
                {data && data.length > 0 ? (
                  <span>{data && data}</span>
                ) : (
                  <span className="card-encounters text-center">
                    {" "}
                    <SiOpenstreetmap /> Location not found
                  </span>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default EncountersPokemon;
