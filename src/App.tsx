import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Chat from "./components/Chat";
import styled, { StyledComponent } from 'styled-components';
import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Login } from './components/Login';
import { Spinner } from './components/Spinner';

function App(): ReactElement {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingDiv>
          <AppLoadingImage src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="logo"></AppLoadingImage>
          <Spinner></Spinner>
        </AppLoadingDiv>
      </AppLoading>
    );
  }

  return (
    <Router>
      {user == null ? (<Login></Login>) : (
        <div className="App">
          <Nav></Nav>

          <AppBody>
            <Sidebar></Sidebar>

            <Routes>
              <Route path='/' element={<Chat></Chat>}></Route>
            </Routes>
          </AppBody>
        </div>
      )}
    </Router>
  );
}

export default App;

const AppBody: StyledComponent<"div", any> = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const AppLoading: StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    align-items: center;
`;
const AppLoadingDiv: StyledComponent<"div", any> = styled.div`
  
`;
const AppLoadingImage: StyledComponent<"img", any> = styled.img`
    height: 10em;
    width: 10em;
    object-fit: contain;
    transform: scale(1.05);
`
