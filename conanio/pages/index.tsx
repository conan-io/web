import React from 'react';

import { ConanKitchenHeader } from '../components/header';
import ConanHome from '../components/home';
import ConanFooter from '../components/footer';

function HomePage() {
  return (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <ConanHome/>
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default HomePage
