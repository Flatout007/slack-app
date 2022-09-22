
import styled, { StyledComponent } from "styled-components";
import ChatItem from "./ChatItem";
import ChatInputBox from "./ChatInputBox";
import { StarOutline, SvgIconComponent, InfoOutlined } from "@material-ui/icons"
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { roomCollection, roomMessageCollection } from "../firebase";
import { doc, DocumentData, DocumentReference, onSnapshot, orderBy, Query, query, QuerySnapshot, where } from "firebase/firestore";
import {firestore} from "../firebase";
import { useEffect, useRef, useState } from "react";


export interface ChatProps {
}

export default function Chat(props: ChatProps) {

    const arr = [];
    const roomId: string = useSelector(function (state: RootState): string {
        const { roomId } = state.channel;

        return roomId;
    });
    let roomData: DocumentReference;
    const [messages, getMessages] = useState<Array<DocumentData>>([]);
    /**
     * @Todo
     *  - Get the current room details based on the roomId stored in redux.
     * 
     *  - Get all of the room's messages based on the roomId. Order 
     *    asc by timestamp.
    */

    useEffect(function() {
        if (roomId) {
            const collection: Query = query(roomMessageCollection, where("id", "==", roomId));

            onSnapshot(collection, function (snapshot: QuerySnapshot): void {
                getMessages(snapshot.docs.map(function (ele: DocumentData) { return ele; }));
            });
        }
    }, []) 

    if(roomId) {
        roomData = doc(firestore, "room", roomId);
        console.log(roomData);
    }

    console.log(messages);


    for (let i = 0; i < 10; i++) {
        arr.push(<ChatItem></ChatItem>);
    }

    // console.log("roomData => " && roomData, "messages => "+ messages);

    return (
        <ChatContainer>
            <ChatHeader>
                <ChatHeaderIconsLeft>
                    <ChatHeaderStrong>#Room-Name</ChatHeaderStrong>
                    <Star></Star>
                </ChatHeaderIconsLeft>
                <ChatHeaderIconsRight>
                    <ChatHeaderH1>Details</ChatHeaderH1>
                    <Info></Info>
                </ChatHeaderIconsRight>

            </ChatHeader>
            <div style={{ marginTop: '10px', overflowY: 'scroll' }}>
                {arr}
            </div>
            <ChatInputBox roomId={roomId}></ChatInputBox>

        </ChatContainer>
    );
}

const ChatContainer: StyledComponent<"div", any> = styled.div`
    display: grid;
    height: 100vh;
    width: 90vw;
    margin-left: 16em;
`;
const ChatHeader: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
`;
const ChatHeaderStrong: StyledComponent<"strong", any> = styled.strong`
    text-transform: lowercase;
    font-size: 1rem;
    font-weight: 900;
`;
const Star: StyledComponent<SvgIconComponent, any> = styled(StarOutline)`
    margin-left: 10px;
`;
const ChatHeaderIconsLeft: StyledComponent<"div", any> = styled.div`
    height: 2em;
    width: 150px;
    display: flex;
    align-items: center;
    margin-left: 5%;
`;
const ChatHeaderIconsRight: StyledComponent<"div", any> = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   right: 5em;
   height: 2em;
   width: 150px;
`;
const ChatHeaderH1: StyledComponent<"h1", any> = styled.h1`
    font-size: 1rem;
`;
const Info: StyledComponent<SvgIconComponent, any> = styled(InfoOutlined)`
    margin-left: 10px;
`;

