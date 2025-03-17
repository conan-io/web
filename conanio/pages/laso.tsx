import React from 'react';
import { LasoScholarship } from '@/components';
import {ConanKitchenHeader, ConanFooter} from '@/components';


const LasoPage = () => {

    return (
        <React.StrictMode>

            <div className="flex-wrapper">
                <ConanKitchenHeader titlePrefix={"Laso Scholarship"}/>
                <LasoScholarship/>
                <ConanFooter/>
            </div>

        </React.StrictMode>
    );
}

export default LasoPage
