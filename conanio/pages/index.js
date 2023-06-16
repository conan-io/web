import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanHome from '../components/home';
import ConanFooter from '../components/footer';

function HomePage() {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <ConanHome/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default HomePage
