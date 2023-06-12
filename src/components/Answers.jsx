import styled from "@emotion/styled";

export const Answers = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    align-items: center;

`

export const Answer = styled.button`
    cursor: pointer;
    color: ${props => props.color};
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    width: 800px;
    border-radius: 5px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: ${props => props.selected ? 'rgb(0,0,0)' : 'transparent'};
    

&:hover {
    background-color: ${props => props.selected ? 'rgb(0,0,0)' : 'rgba(1,1,1,0.4)'};
}
`;