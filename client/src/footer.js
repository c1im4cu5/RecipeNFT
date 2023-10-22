import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FiTwitter} from "react-icons/fi";
import {SiGithub} from "react-icons/si";
import {TbBrandTelegram} from "react-icons/tb";
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#8c3f00", color: "#FFFFFF", paddingTop: "40px", paddingBottom: "40px" }}>
      <Container>
        <Row>
          <Col>
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/vision">Vision</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Register/Login</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/login">Register/Login</a>
              </li>
              <li>
                <a href="/works">How it works</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/contact">Customer Service</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://twitter.com/C1im4cu5">
                  <i className="fab fa-twitter"></i> <FiTwitter/>
                </a>
              </li>
              <li>
                <a href="https://github.com/c1im4cu5">
                  <i className="fab fa-github"></i> <SiGithub/>
                </a>
              </li>
              <li>
                <a href="https://t.me/parcaeio">
                  <i className="fab fa-telegram"></i> <TbBrandTelegram/>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <h6 style={{ color: "white" }}>
            RecipeNFT: Preserving Culinary Legacy via Blockchain
          </h6>
          <h6 style={{ color: "white" }}>
            &copy; 2023 The Brothers Cain. All rights reserved.
          </h6>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
