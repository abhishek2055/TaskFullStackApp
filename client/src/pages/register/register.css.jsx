import { styled } from "styled-components";

export const RegisterPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom right, white, #F8F8F8);

`;

export const RegisterBox = styled.form`
padding: 18px;
border-radius: 15px;
display: flex;
flex-direction: column;
gap: 18px;
background-image: linear-gradient(to bottom right, white, #F8F8F8);
box-shadow: 3px 5px 15px lightblue;
.registeration-details{
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.checkbox-terms-conditions{
    display: flex;
    flex-direction: row;
    gap: 3px;
    justify-content: center;
    align-items: center;
}
.password-input-eyes{
    position: relative;
    .eyes{
        position: absolute;
        right: 15%;
        top: 32%;
    }
}
`;
export const Detailbox = styled.div`
    display: flex;
    flex-direction: column;
    .label-name{
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }
`;