import styled from "@emotion/styled"

export const FormPage = styled.div`

    header{
        display:flex;
        justify-content: space-between;
    }

    h1{
        text-align:center;
    }

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    input{
        background-color:#EEEEEE;
        border:none;
        border-radius:5px;
        outline:none;
        height:25px;
        width: 15rem;
    }

    select{
        background-color:#EEEEEE;
        border:none;
        border-radius:5px;
        outline:none;
        
    }
`

export const FormContentContainer = styled.div`
display:flex;
gap:20px;
padding-left: 50px;
`

export const FormContent = styled.div`
    display:flex;
    align-items:flex-start;
    flex-direction:column;
`