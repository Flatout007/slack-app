import "../App.css";
import ChannelItem from "./ChannelItem";
import styled, { StyledComponent } from "styled-components";
import { ReactElement, useRef, SyntheticEvent } from "react";
import { ArrowDropDownRounded, SvgIconComponent, AddRounded, FiberManualRecord } from "@material-ui/icons"
import { addDoc, DocumentData } from "firebase/firestore";
import { auth, roomCollection } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Sidebar(): ReactElement {

    const list = useRef<HTMLLIElement>(null);
    const icons = useRef<HTMLDivElement>(null);
    const queue: Array<EventTarget & Element | HTMLLIElement | null> = [];
    let state: number = 0;
    let id: string;
    const [collection] = useCollection<DocumentData>(roomCollection);
    const channelItems: ReactElement[] | undefined = collection?.docs.map(function (ele: DocumentData): ReactElement {

        const { name } = ele.data();
        id = ele.id;

        return (<ChannelItem key={`${id}`} id={`${id}`} title={name}></ChannelItem>);
    });
    const channelContainer = useRef<HTMLDivElement>(null);
    const [user] = useAuthState(auth);

    function handleEnableBlueOnClick(e: SyntheticEvent): void {

        e.currentTarget.classList.remove("slack-color-hover");

        if (state === 0)
            queue.push(list.current);

        if (queue[0]) {
            queue[0].classList.remove("blue");
            queue[0].classList.remove("white-text");
        }

        queue.push(e?.currentTarget);

        if (queue.length > 1)
            queue.shift();

        e.currentTarget.classList.add("blue");
        e.currentTarget.classList.add("white-text");

        state = 1;
    }

    function handleDisableSlackColorOnMouseEnter(e: SyntheticEvent): void {

        if (e.currentTarget.classList.contains("blue"))
            e.currentTarget.classList.remove("slack-color-hover");
        else
            e.currentTarget.classList.add("slack-color-hover");
    }

    function displayOptionsOnMouseEnter(e: SyntheticEvent): void {
        icons.current?.classList.add("show");
    }

    function hideOptionsOnMouseLeave(e: SyntheticEvent): void {
        icons.current?.classList.remove("show");
    }

    function addChannel(e: SyntheticEvent): void {

        const channelName: string | null = prompt("Please enter a new channel name");

        if (channelName != null && channelName.length >= 1) {
            addDoc(roomCollection, { name: channelName, id: id });
        }
    }

    function handleDropDownOnClick(e: SyntheticEvent): void {

        if (e.currentTarget.classList.contains("dropdown")) {
            channelContainer.current?.classList.add("hide");
            e.currentTarget.classList.remove("dropdown");
            channelContainer.current?.classList.remove("show");
        }
        else {
            e.currentTarget.classList.add("dropdown");
            channelContainer.current?.classList.remove("hide");
            channelContainer.current?.classList.add("show");
        }
    }

    return (
        <Aside>
            <AsideTitle>
                <AsideH1>Slack Channel Name And</AsideH1>
                <svg
                    style={{ height: "2em", width: "2em", color: "white" }}
                    data-us8="true"
                    aria-hidden="true"
                    viewBox="0 0 20 20" className="">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.75 8 10 11.75 6.25 8"></path>
                </svg>
                <AsidePencilContainer className="margin-l">
                    <svg
                        style={{ height: "1.5em", width: "1.5em", color: "#522653" }}
                        data-us8="true" aria-hidden="true" viewBox="0 0 20 20"
                        className="">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M9.75 3.25h-4.5a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-4.5"></path><path strokeLinejoin="round" d="m8 9.5-.75 3.25L10.5 12l6.763-6.763a1.75 1.75 0 0 0 0-2.474l-.026-.026a1.75 1.75 0 0 0-2.474 0L8 9.5ZM14 4l2 2"></path></g>
                    </svg>
                </AsidePencilContainer>
                <FiberRecord></FiberRecord>
                <AsideDisplayName>{user?.displayName?.toString()}</AsideDisplayName>
            </AsideTitle>

            <AsideUL>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e): void { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true"
                        aria-hidden="true"
                        viewBox="0 0 20 20" className="is-inline"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinejoin="round" d="M16.78 13.759a7.75 7.75 0 1 0-3.02 3.02l3.99.971-.97-3.991Z"></path><path strokeLinecap="round" d="M6.75 8.25h6.5m-6.5 3.5h4.5"></path></g>
                    </svg>
                    <AsideP>
                        Threads
                    </AsideP>
                </AsideLI>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e) { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true" aria-hidden="true" viewBox="0 0 20 20"
                        className="is-inline"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.714 15.432a4.25 4.25 0 1 1 1.854 1.854l-2.318.464.464-2.318Z"></path><path strokeLinecap="round" d="M14 12.966a5.4 5.4 0 0 0 .75-.316l3 .6-.6-3A5.5 5.5 0 1 0 6.952 6.265"></path></g>
                    </svg>
                    <AsideP>Direct messages</AsideP>
                </AsideLI>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e) { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true" aria-hidden="true" viewBox="0 0 20 20" className="is-inline"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="3.75"></circle><path strokeLinecap="round" d="M13.75 6.75v4.605c0 1.047.848 1.895 1.895 1.895v0a2.605 2.605 0 0 0 2.605-2.605V10"></path><path strokeLinecap="round" d="M18.25 10a8.25 8.25 0 1 0-3.497 6.744"></path></g>
                    </svg>
                    <AsideP>Mentions & reactions</AsideP>
                </AsideLI>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e) { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true" aria-hidden="true"
                        viewBox="0 0 20 20" className="is-inline"><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M3.25 5.25a3 3 0 0 1 3-3h7.5a3 3 0 0 1 3 3v11.642c0 .766-.927 1.15-1.469.607l-5.21-5.218a.1.1 0 0 0-.142 0l-5.21 5.218c-.542.543-1.469.16-1.469-.607V5.25Z"></path>
                    </svg>
                    <AsideP>Saved items</AsideP>
                </AsideLI>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e) { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true" aria-hidden="true" viewBox="0 0 20 20"
                        className="is-inline"><g fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M1.75 4.75a3 3 0 0 1 3-3h5.5a3 3 0 0 1 3 3v13.5H2.75a1 1 0 0 1-1-1V4.75Z"></path><path stroke="currentColor" strokeWidth="1.5" d="M13.5 8h1.75a3 3 0 0 1 3 3v6.25a1 1 0 0 1-1 1H13M9.75 18v-2.25a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1V18"></path><circle cx="6" cy="8.5" r="1" fill="currentColor"></circle><circle cx="6" cy="5.5" r="1" fill="currentColor"></circle><circle cx="9" cy="5.5" r="1" fill="currentColor"></circle><circle cx="9" cy="8.5" r="1" fill="currentColor"></circle><circle cx="9" cy="11.5" r="1" fill="currentColor"></circle><circle cx="6" cy="11.5" r="1" fill="currentColor"></circle></g>
                    </svg>
                    <AsideP>Slack Connect</AsideP>
                </AsideLI>
                <AsideLI
                    className="slack-color-hover"
                    onMouseEnter={function (e): void { handleDisableSlackColorOnMouseEnter(e) }}
                    onClick={function (e): void { handleEnableBlueOnClick(e) }}>
                    <svg
                        style={{ height: "1.5em", width: "1.5em", position: "absolute", marginLeft: "10px" }}
                        data-us8="true" aria-hidden="true" viewBox="0 0 20 20"
                        className="is-inline"><g fill="currentColor"><circle cx="10" cy="3.75" r="1.75" transform="rotate(90 10 3.75)"></circle><circle cx="10" cy="10" r="1.75" transform="rotate(90 10 10)"></circle><circle cx="10" cy="16.25" r="1.75" transform="rotate(90 10 16.25)"></circle></g>
                    </svg>
                    <AsideP>More</AsideP>
                </AsideLI>
                <AsideDMContainer>
                    <div
                        onMouseLeave={function (e): void { hideOptionsOnMouseLeave(e) }}
                        onMouseEnter={function (e): void { displayOptionsOnMouseEnter(e) }}
                        style={{ position: "relative" }}>

                        <AsideDMCaret className="dropdown"
                            onClick={function (e): void { handleDropDownOnClick(e) }}>
                        </AsideDMCaret>
                        <AsideChannelUL>Channels
                            <div ref={channelContainer} className="channel-container">
                                {collection && channelItems}
                            </div>
                        </AsideChannelUL>

                        <AsideIconsContainer ref={icons}>
                            <AsideHoverCaretContainer>
                                <svg
                                    style={{ color: "#C2B2C3", cursor: "pointer" }}
                                    data-us8="true" aria-hidden="true" viewBox="0 0 20 20"
                                    className="is-inline"><g fill="currentColor"><circle cx="10" cy="3.75" r="1.75" transform="rotate(90 10 3.75)"></circle><circle cx="10" cy="10" r="1.75" transform="rotate(90 10 10)"></circle><circle cx="10" cy="16.25" r="1.75" transform="rotate(90 10 16.25)"></circle></g>
                                </svg>
                            </AsideHoverCaretContainer>
                            <AsideHoverAddContainer onClick={function (e): void { addChannel(e) }}>
                                <AsideAddIcon></AsideAddIcon>
                            </AsideHoverAddContainer>

                        </AsideIconsContainer>
                    </div>
                    <div
                        style={{ position: "relative" }}>
                        <AsideDMCaret></AsideDMCaret>
                        <AsideDMUL>Direct Messages</AsideDMUL>
                        <AsideIconsContainer>
                            <AsideHoverCaret></AsideHoverCaret>
                            <AsideAddIcon></AsideAddIcon>
                        </AsideIconsContainer>
                    </div>
                </AsideDMContainer>
            </AsideUL>
        </Aside>
    );
}

const Aside: StyledComponent<"aside", any> = styled.aside`
    min-width: 255px;
    background-color: #3F0E40;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 1400px) {
        width: 21em;
    }
`;
const AsideTitle: StyledComponent<"div", any> = styled.div`
    width: 14.9em;
    height: 4em;
    z-index: 100;
    margin-top: 56px;
    border-top: 2px solid #522653;
    border-bottom: 2px solid #522653;
    position: fixed;
    display: flex;
    align-items: center;

    @media only screen and (min-width: 1400px) {
        width: 18em;
    }
`;
const AsideH1: StyledComponent<"h1", any> = styled.h1`
    width: 150px;
    font-size: 1.3rem;
    margin-left: 12px;
    padding-left: 5px;
    padding-right: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: white;
    margin-bottom: 10px;
`;
const AsidePencilContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
    align-items: center;
    height: 2.5em;
    width: 2.5em;
    justify-content: center;
    background-color: white;
    border-radius: 100%;
    margin-left: 5px;

    cursor: pointer;

    &:hover {
        transform: scale(0.9);
    }

    @media only screen and (min-width: 1400px) {
        position: absolute;
        left: 14em;
        margin-left: 0;
    }
`;
const AsideUL: StyledComponent<"ul", any> = styled.ul`
    width: 100%;
    height: 269px;
    margin-top: 145px;
    font-size: 1.1rem;
    list-style: none;
    border-bottom: 2px solid #522653;
`;
const AsideLI: StyledComponent<"li", any> = styled.li`
    height: 2em;
    color: #C2B2C3;
    display: flex;
    align-items: center;
    position: relative;
`;
const AsideP: StyledComponent<"p", any> = styled.p`
    margin-left: 50px;
`;
const AsideDMContainer: StyledComponent<"div", any> = styled.div`
    height: 400px;
    margin-top: 70px;
`;
const AsideChannelUL: StyledComponent<"ul", any> = styled.ul`
    color: white;
    text-indent: 45px;
    font-weight: 900;
`;
const AsideDMCaret: StyledComponent<SvgIconComponent, any> = styled(ArrowDropDownRounded)`
    color: white;
    position: absolute;
    margin-left: 10px;
    transform: rotate(270deg) scale(1.35);
    cursor: pointer;
`;
const AsideDMUL: StyledComponent<"ul", any> = styled.ul`
    margin-top: 16px;
    text-indent: 45px;
    color: #C2B2C3;
`;
const AsideIconsContainer: StyledComponent<"div", any> = styled.div`
    height: 1.5em;
    width: 60px;
    position: absolute;
    left: 11em;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: none;
    transition-delay: 5s;   
`;
const AsideHoverCaretContainer: StyledComponent<"div", any> = styled.div`
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.3em;

    &:hover {
        background-color: var(--slack-color);
    }
`;
const AsideHoverAddContainer: StyledComponent<"div", any> = styled.div`
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
    border-radius: 0.3em;

    &:hover {
        background-color: var(--slack-color);
    }
`;
const AsideHoverCaret: StyledComponent<SvgIconComponent, any> = styled(ArrowDropDownRounded)`
    color: #C2B2C3;
    cursor: pointer;
`;
const AsideAddIcon: StyledComponent<SvgIconComponent, any> = styled(AddRounded)`
    color: #C2B2C3;
    transform: rotate(270deg) scale(1.2);
    cursor: pointer;
`;
const AsideDisplayName: StyledComponent<"p", any> = styled.p`
    position: absolute;
    margin-top: 40px;
    margin-left: 40px;
    color: white;
    font-size: 0.9rem;
`;
const FiberRecord: StyledComponent<SvgIconComponent, any> = styled(FiberManualRecord)`
    position: absolute;
    margin-top: 40px;
    margin-left: 12px;
    color: green;
`;
