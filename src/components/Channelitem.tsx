import styled, { StyledComponent } from "@emotion/styled";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { enterRoom } from "../features/channel-slice";

export interface ChannelItemProps {
  key: string;
  id: string;
  title: string;
}

export default function ChannelItem(props: ChannelItemProps): ReactElement {

  const dispatch: Dispatch = useDispatch();

  function getRoomIdOnClick(): void {
    dispatch(enterRoom({
      roomId: props.id
    }));
  }

  return (
    <ChannelLI onClick={function (): void { getRoomIdOnClick() }}>
      <ChannelSpan>#</ChannelSpan>
      <ChannelP> {props.title}</ChannelP>
    </ChannelLI>
  );
}

const ChannelLI: StyledComponent<"li", any> = styled.div`
    color: #C2B2C3;
    margin-top: 7px;
    cursor: pointer;
    display: flex;
`;
const ChannelP: StyledComponent<"p", any> = styled.p`
  position: relative;
  right: 55px;
`;
const ChannelSpan: StyledComponent<"span", any> = styled.span`
  position: relative;
  right: 28px;
`;