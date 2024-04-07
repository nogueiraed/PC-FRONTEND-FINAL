import React from 'react';
import FormDW from "../forms/FormDailyWorksheet";
import Layout from "../template/Layout";
import { useLocation } from "react-router-dom";

export default function RegDW(){
    const location = useLocation();
    console.log("Props.location:", location);
    return(
        <Layout>
            <FormDW location={location}/>
        </Layout>
    )
}
