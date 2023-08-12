import styled from "@emotion/styled";
import { Btn } from "./Buttons";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    position:relative;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 80%; 
    max-height: 80%; 
    overflow: auto; 
`;

export const CloseButton = styled(Btn)`
    position:absolute;
    top: 10px;
    right: 10px;
    transform: translateY(-50%);
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #ccc;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

export const DeleteContainer = styled.div`
    display:flex;
    justify-content:center;
`