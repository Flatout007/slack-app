import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";

export interface ChatItemProps {
  message: string
  timestamp: string
  photoURL: string
  user: string
}

export default function ChatItem(props: ChatItemProps): ReactElement {

  console.log(props.photoURL);

  return (
    <ChatItemBox>
      <ChatItemContainer>

        <ChatItemAvatar alt="default-icon" src={props.photoURL != null ? props.photoURL : "https://ca.slack-edge.com/T03GU501J-U01HM5NV3C5-g06adcd97a86-512"}></ChatItemAvatar>

        <ChatItemContents>
          <ChatItemH1>{props.user}<ChatSpan>{props.timestamp}</ChatSpan></ChatItemH1>
          <ChatItemP>{props.message}</ChatItemP>
        </ChatItemContents>
      </ChatItemContainer>
    </ChatItemBox>
  );
}

const ChatItemBox: StyledComponent<"div", any> = styled.div`
  display: flex;
  height: 8em;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const ChatItemContainer: StyledComponent<"div", any> = styled.div`
  height: 5.2em;
  width: 600px;
  margin-left: 6%;
  position: relative;
  display: flex;
  align-items: center;
`;
const ChatItemAvatar: StyledComponent<"img", any> = styled.img`
  height: 5em;
  width: 5em;
  border-radius: 0.4em;
`;
const ChatItemContents: StyledComponent<"div", any> = styled.div`
  width: 500px;
  height: 4em;
  position: absolute;
  margin-left: 90px;
`;
const ChatItemH1: StyledComponent<"h1", any> = styled.h1`
  font-size: 1.1rem;
`;
const ChatItemP: StyledComponent<"p", any> = styled.p`
  width: 30em;
  display: inline-block;
  word-wrap: break-word;
`;
const ChatSpan: StyledComponent<"span", any> = styled.span`
  margin-left: 10px;
  font-size: 0.8rem;
  color: gray;
  letter-spacing: 0.5px;
`;

