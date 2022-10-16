
import styled, { StyledComponent } from "styled-components";
import ChatItem from "./ChatItem";
import ChatInputBox from "./ChatInputBox";
import { StarOutline, SvgIconComponent, InfoOutlined } from "@material-ui/icons"
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { collection, doc, DocumentData, DocumentReference, getDoc, onSnapshot, orderBy, Query, query, QuerySnapshot, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { NothingToShow } from "./NothingToShow";

export interface ChatProps {
}

export default function Chat(props: ChatProps) {

    const roomId: string = useSelector(function (state: RootState): string {
        const { roomId } = state.channel;
        return roomId;
    });
    const [messages, getMessages] = useState<Array<DocumentData>>([]);
    const [room, getRoom] = useState<DocumentData | undefined>({});
    const chatItems: ReactElement[] = messages.map(function (ele: DocumentData): ReactElement {
        const { message, timestamp, user, userImage } = ele.data();

        return (<ChatItem user={user} photoURL={userImage} timestamp={handleTime(timestamp)} message={message}></ChatItem>);
    });

    useEffect(function (): void {

        if (roomId) {

            const q: Query = query(collection(firestore, "room", roomId, "messages"), orderBy("timestamp", "asc"));

            const currentRoom: DocumentReference = doc(firestore, "room", roomId);

            getDoc(currentRoom).then(function (data: DocumentData): void { getRoom(data.data()) });

            onSnapshot(q, function (snap: QuerySnapshot): void {
                getMessages(snap.docs.map(function (ele: DocumentData): DocumentData {
                    return ele;
                }));
            });
        }
    }, [roomId]);

    function scrollToBottomOnLoad(e: SyntheticEvent) {

        e.currentTarget.scrollTo({
            top: e.currentTarget.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleTime(time: Timestamp): string {

        const t: string[] = new Date(time?.seconds * 1000).toUTCString().split(" ");
        let formattedTime: string[] = [];

        for (let i: number = 0; i < t.length; i++) {
            formattedTime[formattedTime.length] = t[i];
        }

        return formattedTime.slice(1).reverse().join(" ");
    }

    if (messages && messages.length <= 0) {
        return (<NothingToShow></NothingToShow>)
    }

    return (
        <ChatContainer >
            <ChatHeader>
                <ChatHeaderIconsLeft>
                    <ChatHeaderStrong>#{room && room.name}</ChatHeaderStrong>
                    <Star></Star>
                </ChatHeaderIconsLeft>
                <ChatHeaderIconsRight>
                    <ChatHeaderH1>Details</ChatHeaderH1>
                    <Info></Info>
                </ChatHeaderIconsRight>
            </ChatHeader>

            <ChatDiv onLoad={function (e: SyntheticEvent): void { scrollToBottomOnLoad(e) }}>

                {chatItems}
                
            </ChatDiv>

            <ChatInputBox roomName={room?.name} roomId={roomId}></ChatInputBox>

        </ChatContainer>
    );
}

const ChatContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;
const ChatHeader: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 4.72em;
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
const ChatDiv: StyledComponent<"div", any> = styled.div`
    height: 100vh;
    overflow-y: scroll;
`;
