import { FormEvent, ReactElement, SyntheticEvent, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import { Button } from "@material-ui/core";
import { firestore } from "../firebase";
import { doc, serverTimestamp, addDoc, collection, DocumentReference } from "firebase/firestore";

export interface ChatInputBoxProps {
    roomId: string;
}

export default function ChatInputBox(props: ChatInputBoxProps): ReactElement {

    const inputRef = useRef<HTMLInputElement>(null);

    function sendMessageOnSubmit(e: SyntheticEvent): void {

        e.preventDefault();

        if (props.roomId != null) {

            const roomReference: DocumentReference = doc(firestore, "room", props.roomId);

            addDoc(collection(roomReference, "messages"), {
                message: inputRef.current?.value,
                timestamp: serverTimestamp(),
                user: "Sender User",
                userImage: null
            }).then(function (): void { alert("message sent") })
                .catch(function (): void { alert("something went wrong") });
        }
    }

    return (
        <ChatFormContainer>
            <ChatForm onSubmit={function (e: FormEvent): void { sendMessageOnSubmit(e) }}>
                <ChatInput ref={inputRef} placeholder="Message"></ChatInput>
                <Button
                    style={{ display: 'none' }} hidden type="submit">
                    send
                </Button>
            </ChatForm>
        </ChatFormContainer>
    );
}

const ChatForm: StyledComponent<"form", any> = styled.form`
      height: 3.5em;
      width: 60em;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
`;
const ChatInput: StyledComponent<"input", any> = styled.input`
    width: 59em;
    height: 100%;
    text-indent: 10px;
    border: 1px solid gray;
    border-radius: 0.2em;

    &:focus {
        outline: none;
    }
`;
const ChatFormContainer: StyledComponent<"div", any> = styled.div`
      height: 9em;
      width: 100%;
      display: flex;
      align-items: center;
`;