import { FaEnvelope, FaTelegram, FaTwitter } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";

function ContactPage() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Contact Us</h1>
            <p className="lead">We're excited to help in any way. Please use one of the methods below (Email, Telegram, Twitter) to contact us. We look forward to hearing from you!</p>
            <div className="d-flex justify-content-center">
              <p>
                <a href="mailto:info@parcae.io" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope size={80} className="mx-3" />
                </a>
                <a href="https://t.me/parcaeio" target="_blank" rel="noopener noreferrer">
                  <FaTelegram size={80} className="mx-3" />
                </a>
                <a href="https://twitter.com/C1im4cu5" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={80} className="mx-3" />
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactPage;
