import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "./components/Header";



function Root() {
  return ( 
   <div>
    <Header />
    <Outlet />
   </div>
  );
}

export default Root;
