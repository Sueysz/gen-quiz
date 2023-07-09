import styled from "@emotion/styled";
import { Link } from 'react-router-dom';

export const CardContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

export const Card = styled(Link)`
    display: flex;
    width: 200px;
    height: 150px;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    border: 1px solid white;
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
    transition: 100ms;
    background-color: #fafafa;
        p{
            text-align:center;
        }
    &:hover{
        cursor: pointer;
        transform: scale(1.05);
    }

    @media screen and (max-width:450px){
        width: 390px;
    }
`;

export const CardAdd = styled(Link)`
    width: 200px;
    display: flex;
    height: 150px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 1px solid white;
    font-size: 1.5rem;
    text-decoration: none;
    color: white;
    transition: 100ms;
    background-color: #fafafa;
    font-size: 5rem;
    position: relative;

    &:hover {
    cursor: pointer;
    transform: scale(1.05);
    }

    &:before {
    content: "+";
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    }

@media screen and (max-width: 450px) {
    width: 390px;
    }
`;