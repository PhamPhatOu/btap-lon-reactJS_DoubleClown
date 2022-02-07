import React from "react";
import Register from '../components/Register';
import styled from "styled-components";
import { PageHero } from "../components";

const RegisterPage=()=>{
    return(
        <main>
          <PageHero title='Register'/>
            <Wrapper>
               <div >
                <Register/>
               </div>
            </Wrapper>           
        </main>
        
    )
}

const Wrapper = styled.div`
  padding: 50px;
  margin: auto;
  
`
export default RegisterPage