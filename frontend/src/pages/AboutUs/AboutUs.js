import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css';
import { visionImg, objGImg, objEImg, quienesImg, misionImg } from './index';

import vision from '../../imagenes/vision.jpg';
import ObjG from '../../imagenes/obj.jpg';
import ObjE from '../../imagenes/objEs.jpg';
import Quienes from '../../imagenes/quienes_somos.jpeg';
import mision from '../../imagenes/MISION.jpeg';

function AboutUs() {
  return (
    <Container className='AboutUsInfo'>
      <Row className='mb-4'>
        <Col>
          <h1>ACERCA DE NOSOTROS</h1>
          <p>En esta sección podrás conocer más al respecto de quiénes somos, conjuntamente con la misión y visión del proyecto realizado a su vez de la unidad de vinculación de departamento de Ciencias Económicas, Administrativas y de Comercio - DCEA.</p>
        </Col>
      </Row>

      <Row className='about-section mb-4'>
        <Col md={12}>
          <h2>¿Quienes Somos?</h2>
          <p>Prowess Agronomia es una plataforma creada para aumentar el desarrollo y comercialización de la producción agrícola de todo el país. Nuestro equipo trabaja arduamente para difundir el concepto de la agronomía como sistema.</p>
        </Col>
        <Col md={12}>
          <Image src={Quienes} alt="Imagen Quienes Somos" fluid />
        </Col>
      </Row>

      <Row className='about-section mb-4'>
        <Col md={6}>
          <h2>Misión</h2>
          <p>Ayudar al crecimiento económico y productivo de los agricultores, siendo Prowess Agrícola un intermediario directo con buena capacidad de negociación y desarrollo de estrategias de comercialización, el mismo que se encargará de la distribución de los productos, en buenas condiciones sin perder su calidad al momento de ser trasladados.</p>
          <Image src={mision} alt="Imagen Misión" fluid className='about-image-mision'/>
        </Col>
        <Col md={6}>
          <h2>Visión</h2>
          <p>Al 2024 ser una plataforma estable y ser considerados por nuestros benefactores como una opción viable para comercializar sus productos a todo el país.</p>
          <Image src={vision} alt="Imagen Visión" fluid className='about-image-vision'/>
        </Col>
      </Row>

      <Row className='about-section mb-4'>
        <Col md={6}>
          <h2>Objetivos Generales</h2>
          <p>Establecer alianzas con los productores para que a través de Prowess Agrícola puedan incrementar exponencialmente las ventas de sus productos agrícolas ganando así mayor mercado de consumo.</p>
          <Image src={ObjG} alt="Imagen Objetivos Generales" fluid />
        </Col>
        <Col md={6}>
          <h2>Objetivos Específicos</h2>
          <ul>
            <li>Incrementar los mecanismos de comercialización de productos.</li>
            <li>Impulsar la compra y venta de productos mediante la plataforma Prowess Agrícola.</li>
            <li>Desarrollar nuevas estrategias de negociación y comercialización con los consumidores.</li>
          </ul>
          <Image src={ObjE} alt="Imagen Objetivos Específicos" fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
