import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height : 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 45px;
`;


interface LocationState {
    state: {
        name: string;
        rank:number;
    }
};




function Coin() {
    const [loading, setLoding] = useState(true);
    const { coinId } = useParams();
    const {state} = useLocation() as LocationState;  
    return (  
    <Container>
        <Header>
            <Title>{state?.name || "Loading"}</Title>        
        </Header>
            { loading ? 
                <Loader>Loading <FontAwesomeIcon icon={faSpinner} spinPulse /></Loader> : null }
    </Container>
    );
}

export default Coin;