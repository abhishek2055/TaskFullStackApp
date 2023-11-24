import { styled } from "styled-components";

export const HeadSection = styled.div`
display: flex;
flex-direction: column;
font-family: roboto;
text-align: center;
margin: 16px;
`;
export const HomeBody = styled.div`

    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .articles{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 3rem;
        margin: 5rem;
    }

`;