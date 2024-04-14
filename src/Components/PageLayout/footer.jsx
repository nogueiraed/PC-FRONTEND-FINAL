import React from "react";
import {MDBFooter, MDBContainer} from 'mdb-react-ui-kit';



export default function Footer() {
    return (
      <MDBFooter className='text-center' color='white' bgColor='dark'>
        <MDBContainer className='p-1'>
          <section className='mb-0.5'>
          <p>
            Precision Cleaning Services - 
            27 Randolph Street Eden Terrace, Auckland 1010 - Email:&nbsp; 
          
          
            <a href="mailto:info@precisioncleans.co.nz" 
               style={{ textDecoration: 'none', color: 'inherit' }}
               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
               onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
              info@precisioncleans.co.nz
            </a>
            <br />
            <a href="tel:(09)2993524" 
               style={{ textDecoration: 'none', color: 'inherit' }}
               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
               onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
              Phone: (09) 299-3524
            </a>
          </p>
        </section>
        </MDBContainer>
  
        <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright: {''}
          <span className="mx-0.5"></span> 
          <a className='text-white' href='https://eduardonogueira.co.nz/'>
              EFN Solutions
          </a>
        </div>
      </MDBFooter>
    );
  }