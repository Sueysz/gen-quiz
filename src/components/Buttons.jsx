import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const LoginButton = styled(Link)`
    display: flex;
    padding: 20px;
    cursor: pointer;
    font-size:1.5rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius:15px;
    width:65px;
    transition: 100ms;
    transform:scale(0.95);
    &:hover{
        transform: scale(1);
        box-shadow: 1px 10px 5px rgba(0, 0, 0, 0.2);
    }
`;