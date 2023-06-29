import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faCar, faUser } from "@fortawesome/free-solid-svg-icons";

export function Home() {
  return (
    <>
      <Container className="album py-5 my-5 bg-light home">
        <Row>
          <Col>
            <Card>
              <div className="mt-3 icon-container">
                <FontAwesomeIcon icon={faCar} className="icon" />
              </div>
              <Card.Body>
                <Card.Title>Vehicles Administration</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                <Link className="btn btn-primary" to="vehicles">
                  Vehicles
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <div className="mt-3 icon-container">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </div>
              <Card.Body>
                <Card.Title>Users Administration</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                <Link className="btn btn-primary" to="users">
                  Users
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <div className="mt-3 icon-container">
                <FontAwesomeIcon icon={faCreditCard} className="icon" />
              </div>
              <Card.Body>
                <Card.Title>Bookings Administration</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                <Link className="btn btn-primary" to="bookings">
                  Bookings
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
