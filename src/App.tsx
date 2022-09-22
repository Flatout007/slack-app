import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Chat from "./components/Chat";
import styled, { StyledComponent } from 'styled-components';
import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(): ReactElement {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>

        <AppBody>
          <Sidebar></Sidebar>

          <Routes>
            <Route path='/' element={<Chat></Chat>}></Route>
          </Routes>
        </AppBody>
      </div>
    </Router>
  );
}

export default App;

const AppBody: StyledComponent<"div", any> = styled.div`
  
  
 
`;
