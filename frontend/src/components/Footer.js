import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BB8 from './BB8';

const Footer = () => {
    return (
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              <BB8 />
            </Col>
          </Row>
        </Container>
      </footer>
    );
}

export default Footer
