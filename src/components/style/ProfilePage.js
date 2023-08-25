import styled from "@emotion/styled";

export const ProfilePage = styled.div`
    h1{
        text-align:center;
    }
    p{
        text-align:center;
    }
    .grid{
        gap: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding:15px
    }
`

export const ProfilImg = styled.img`
    border-radius:50%;
    width: 10rem;
    height:10rem;
    object-fit:cover;
    object-position:center center;
`

export const ProfilInfo = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column
`
