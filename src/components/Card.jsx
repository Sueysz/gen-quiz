import styled from "@emotion/styled";
import { Link } from 'react-router-dom';

export const Card = styled(Link)`
    width: 200px;
    display: flex;
    height: 150px;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    border: 1px solid white;
    font-size: 1.5rem;
    text-decoration: none;
    color: white;
    transition: 100ms;

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
    
    }

    @media screen and (max-width:450px){
        width: 390px;
}
`