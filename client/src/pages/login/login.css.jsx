import { styled } from "styled-components";

export const LoginPage = styled.div`
  background-color: #F8F8F8;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, white, #F8F8F8);

`;

export const LoginBox = styled.form`

    padding: 18px;
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    border-radius: 10px;
    font-family: 'Roboto', sans-serif;
    background-color: #F8F8F8;
    background-image: linear-gradient(to bottom right, white, #F8F8F8);
    box-shadow: 3px 5px 15px lightblue;
    .line-or{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .line{
            width: 43%;
        }
    }

`;
export const SignInText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  .head-signin{
    font-size: 35px;
    font-weight: 700;
  }
  .head-quote{
    font-size: 14px;
    font-weight: 400;
  }
`;

export const StyledInput = styled.input`

  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

`;

export const ForgetPassword = styled.p`
color: blue;
font-size: 14px;
margin-bottom: 5px;
`;

export const StyledButton = styled.button`
    width: 250px;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 700;
  background: ${(props) => props.$bcolor ||"green"};
  border-radius: 25px;
  border: none;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
`;
