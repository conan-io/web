import React from 'react';

import { ConanKitchenHeader, ConanHome, ConanFooter } from '@/components';

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
