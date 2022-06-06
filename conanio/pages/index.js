import React from 'react';
import ConanHeader from '../components/header';
import ConanFooter from '../components/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function HomePage() {
    return (
    <React.StrictMode>
      <ConanHeader/>
      <Container>
      </Container>
      <ConanFooter/>
    </React.StrictMode>
  );
}

export default HomePage
