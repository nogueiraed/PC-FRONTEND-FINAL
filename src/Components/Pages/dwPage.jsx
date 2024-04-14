import React from 'react';
import DwForm from '../Forms/dwForm';
import StandardPage from '../PageLayout/standardPage';
import { useLocation } from "react-router-dom";

export default function DwPage(){
    const location = useLocation();
    console.log("Props.location:", location);
    return(
        <StandardPage>
            <DwForm location={location}/>
        </StandardPage>
    )
}
