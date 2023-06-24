import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const LinkButton = styled(Link)`
    display: flex;
    padding: 20px;
    cursor: pointer;
    font-size:1.5rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius:15px;
    width:65px;
    transition: 100ms;
    transform:scale(0.95);
    text-decoration:none;
    justify-content:center;
    margin-bottom: 10px;
    color: black;
    &:hover{
        transform: scale(0.90);
        box-shadow: 1px 10px 5px rgba(0, 0, 0, 0.2);
    }
`;

export const ConfirmButton = styled.button`
    width: 30vw;
    height: 8vh;
    cursor: pointer;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 2px solid #222;
    background-color: white;
`

export const ValidationButton = styled.button`
    color: #fafafa;
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    width: 800px;
    border-radius: 5px;
    cursor: pointer;
    background-color:rgba(0,0,0,0.2);

    &:hover{
        background-color:rgba(1,1,1,0.4);
    }
`