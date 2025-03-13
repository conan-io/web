import Link from 'next/link'
import React from 'react';
import { LasoScholarship } from '@/components';
import {ConanKitchenHeader, ConanFooter, ConanHome} from '@/components';


const LasoPage = () => {

    return (
        <React.StrictMode>

            <div className="flex-wrapper">
                <ConanKitchenHeader/>
                <LasoScholarship/>
                <ConanFooter/>
            </div>

        </React.StrictMode>
    );
}

export default LasoPage
