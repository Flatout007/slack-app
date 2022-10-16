import styled, { StyledComponent } from '@emotion/styled';
import { signInWithPopup } from 'firebase/auth';
import { ReactElement, SyntheticEvent } from 'react';
import { auth, googleAuth } from '../firebase';

export interface LoginProps {
}

export function Login(props: LoginProps): ReactElement {

    function signIn(e: SyntheticEvent): void {

        e.preventDefault();

        signInWithPopup(auth, googleAuth).catch(error => alert(error.message));
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <LoginImage src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="logo"></LoginImage>
                <LoginH1>Sign In to Slack</LoginH1>
                <LoginP>channel.slack.com</LoginP>
                <LoginButton onClick={function (e: SyntheticEvent) { signIn(e) }}>Sign in with Google</LoginButton>
            </LoginInnerContainer>

        </LoginContainer>
    );
}

const LoginContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;
const LoginInnerContainer: StyledComponent<"div", any> = styled.div`
    height: 30em;
    width: 30em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const LoginImage: StyledComponent<"img", any> = styled.img`
    height: 10em;
    width: 10em;
    object-fit: contain;
    transform: scale(1.05);
`;
const LoginH1: StyledComponent<"h1", any> = styled.h1`
    font-size: 2.1rem;
`;
const LoginP: StyledComponent<"p", any> = styled.p`
   font-size: 1rem;
`;
const LoginButton: StyledComponent<"button", any> = styled.button`
    height: 2.5em;
    width: 10em;
    background-color: green;
    margin-top: 50px;
    color: white;
    cursor: pointer;
`;
