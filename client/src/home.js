import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ImageRotation from './rotation.js'
import RowContainers from './rowContainers.js'

const Home = () => {
  return (
    <div className="pl-5 pr-5">
      <Container>
        <Row>
          <Col>
           <ImageRotation/>
          </Col>
        </Row>
          <Row>
          <Col>
            <h1 className="display-4">Preserve Your Family's Culinary Legacy with RecipeNFT</h1>
            <p className="lead">Unlock the power of blockchain technology for your family recipes.</p>
          </Col>
          </Row>
          <Row>
            <Col>
              <p className="lead">Passing down family recipes is an age-old tradition, but it can be difficult to ensure their preservation over time. That's why we've created RecipeNFT, an innovative app that utilizes the Avalanche blockchain and IPFS storage to create a secure and permanent home for your family's recipes.</p>
              <p className="lead">With RecipeNFT, you can easily create a one-of-a-kind ERC721 token for each family recipe, ensuring that it is unique, verifiable, and cannot be tampered with. Our app is designed with user-friendliness in mind and features a simple and intuitive interface that makes it easy for you to store and share your culinary treasures.</p>
              <p className="lead">As you upload your family's recipes to the blockchain, remember the words of Julia Child: "No one is born a great cook, one learns by doing." By preserving your family's culinary legacy on the blockchain, you're not only preserving the memory of your loved ones, but also empowering future generations to continue the tradition of cooking and sharing family meals.</p>
              <p className="lead">We understand that your family's recipes are more than just ingredients and instructions - they're a part of your family's story. That's why RecipeNFT is more than just an app - it's a celebration of family and culinary heritage.</p>
              <p className="lead">With RecipeNFT, you can ensure that your family's recipes will never be lost or forgotten. Let us help you create a lasting legacy for your family's culinary traditions and make them accessible to future generations.</p>
            </Col>
          </Row>
        </Container>
      <RowContainers/>
    </div>
  );
};

export default Home;
