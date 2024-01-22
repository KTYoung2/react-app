import React from 'react';
import styled from "styled-components"


interface ContainerProps{
    bgColor : string;
    borderColor:string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    background-color: ${(props) => props.bgColor};
    border-color: 3px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor : string;   
    borderColor?: string; 
    text?:string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
    </Container>

}

export default Circle;