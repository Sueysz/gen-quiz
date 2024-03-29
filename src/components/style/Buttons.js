import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const LinkButton = styled(Link)`
    display: flex;
    cursor: pointer;
    padding-bottom:5px;
    font-size:1.5rem;
    border-radius:5px;
    border:1px solid;
    width:6rem;
    height:4rem;
    transition: 250ms;
    transform:scale(0.95);
    text-decoration:none;
    justify-content:center;
    align-items:center;
    color: black;
    &:hover{
        background-color: black;
        color:#EEEEEE;
        transform: scale(0.90);
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
export const Btn = styled.button`
    background-color:transparent;
    border-radius:5px;
    font-size:1rem;
    padding:10px;
    margin:10px;
    transition: 250ms;
    transform:scale(0.95);
    :hover{
        background-color: black;
        color:#EEEEEE;
        transform: scale(0.90);
    }
`
export const BtnCreate = styled(Btn)`
width:8rem;
height:3rem;
`