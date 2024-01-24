import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanCenterHeader } from './header';


// From: https://stackabuse.com/how-to-create-a-loading-animation-in-react-from-scratch/

export default function Loader() {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
        <ConanCenterHeader/>
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}
