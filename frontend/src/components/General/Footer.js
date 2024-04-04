import React from "react";
import { facebook, instagram, mundo, tiktok, whatsapp } from "./index";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "white" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="footer-title text-center" style={{ marginTop: "20px" }}>
              <p>¡Visita nuestras redes sociales para más información! </p>
            </div>
            <div className="footer-content">
              <Row className="align-items-center justify-content-center">
                <Col>
                  <a
                    href="https://www.facebook.com/profile.php?id=100094846861007&mibextid=gik2fB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={facebook}
                      alt="Facebook"
                      style={{ maxWidth: "20px", maxHeight: "20px", filter: "brightness(0) invert(1)" }}
                    />
                    <p className="mb-1">Facebook</p>
                  </a>
                </Col>
                <Col>
                  <a
                    href="https://instagram.com/prowessec7?igshid=NGVhN2U2NjQ0Yg=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instagram}
                      alt="Instagram"
                      style={{ maxWidth: "20px", maxHeight: "20px", filter: "brightness(0) invert(1)" }}
                    />
                    <p className="mb-1">Instagram</p>
                  </a>
                </Col>
                <Col>
                  <a
                    href="https://prowessec.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={mundo}
                      alt="Mundo"
                      style={{ maxWidth: "20px", maxHeight: "20px", filter: "brightness(0) invert(1)" }}
                    />
                    <p className="mb-1">ProwessEc</p>
                  </a>
                </Col>
                <Col>
                  <a
                    href="https://www.tiktok.com/@prowess.ec?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={tiktok}
                      alt="Tiktok"
                      style={{ maxWidth: "20px", maxHeight: "20px", filter: "brightness(0) invert(1)" }}
                    />
                    <p className="mb-1">TikTok</p>
                  </a>
                </Col>
                <Col>
                  <a
                    href="https://api.whatsapp.com/send?phone=593992847677"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={whatsapp}
                      alt="Whatsapp"
                      style={{ maxWidth: "20px", maxHeight: "20px", filter: "brightness(0) invert(1)" }}
                    />
                    <p className="mb-1">WhatsApp</p>
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={12}>
            <div className="footer-contactos text-center">
              <p className="mb-1">
                <strong>Nombre del Director: </strong>{" "}
                <a
                  href="https://api.whatsapp.com/send?phone=0998160293"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dr. Luis Simbaña Taipe
                </a>
              </p>
              <p className="mb-0">
                <strong>Correo Electrónico:</strong>{" "}
                <a href="mailto:lesimbania@espe.edu.ec">
                  lesimbania@espe.edu.ec
                </a>
              </p>
            </div>
          </Col>
          <Col md={12}>
            <div className="footer-info text-center">
              <div className="footer-derechos">
                <p>
                  Todos los derechos reservados - Prowess Ecuador &copy;{" "}
                  {new Date().getFullYear()} | Revisa nuestros{" "}
                  <a href="terms&conditions">Términos y Condiciones</a> | BETA:
                  1.0.0 API
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
