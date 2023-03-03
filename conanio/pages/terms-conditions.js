import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';

function TermsConditionPage() {
  return (
    <React.StrictMode>
      <SSRProvider>
        <ConanKitchenHeader/>
        <br/>
        <h1 className="text-center">Work in progress ...</h1>
        <br/>
        <ConanFooter/>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default TermsConditionPage
