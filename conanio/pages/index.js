import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import ConanHeader from '../components/header';
import ConanHome from '../components/home';
import ConanFooter from '../components/footer';

function HomePage() {
    return (
    <React.StrictMode>
      <SSRProvider>
        <ConanHeader/>
        <ConanHome/>
        <ConanFooter/>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default HomePage
