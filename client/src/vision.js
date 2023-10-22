import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Vision = () => {
  return (
    <div>
    <Container>
      <Row>
        <Col>
          <h1 className="display-4">Recipes on Blockchain</h1>
          <p className="lead">Seeking to preserve family recipes in blockchain</p>
        </Col>
      </Row>
      <Row>
      <Col>
        <p className="lead">Our vision is to revolutionize the way we store and pass down our most cherished family and meal recipes by creating a new standard for recipe storage: recipes on the blockchain.</p>
        <p className="lead">With recipes on blockchain, we aim to provide a more secure, transparent, and decentralized way of preserving the culinary traditions of our families. Each recipe will be transformed into an ERC721 token, ensuring that it is unique and cannot be tampered with.</p>
        <p className="lead">We envision a future where family recipes are not lost, but instead are immortalized on the blockchain. By creating a decentralized, immutable, and secure way to store and pass down our most treasured recipes, we hope to provide a sense of connection and continuity across generations.</p>
        <p className="lead">Just like how passing down family recipes to loved ones is a time-honored tradition, we believe that storing recipes on blockchain via IPFS is a modern and innovative way to ensure that these culinary legacies are never lost.</p>
        <p className="lead">Drawing inspiration from the countless cookbooks and online recipe resources, we seek to provide a permanent and secure storage solution for your family and meal recipes. By storing your family recipes on blockchain, we can ensure that these cherished recipes will be available for future generations to cherish and enjoy.</p>
      </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Vision;
