import React from 'react';
import JaForm from '../Forms/jaForm';
import StandardPage from '../PageLayout/standardPage';
import { useLocation } from "react-router-dom";

export default function JaPage(){
    const location = useLocation();
    console.log("Props.location:", location);
    return(
        <StandardPage>
            <JaForm location={location}/>
        </StandardPage>
    )
}
