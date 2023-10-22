import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import pressRelease2306 from './pressReleases/2306.pdf';
import siteLogo from './images/siteLogo192.png';
import bcLogo from './images/bcLogo192.png';

const Press = () => {
  const pressReleases = [
    { title: 'June 2023', file: pressRelease2306 },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <section>
            <h2>Press Releases</h2>
            <ul>
              {pressReleases.map((pressRelease, index) => (
                <li key={index}>
                  <a href={pressRelease.file} target="_blank" rel="noopener noreferrer">
                    {pressRelease.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <h2>Logos</h2>
            <Row>
              <Col>
                <img src={siteLogo} alt="RecipeNFT Logo" width="192" height="192" />
              </Col>
              <Col>
                <img src={bcLogo} alt="The Brothers Cain Logo" width="192" height="192" />
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Press;
