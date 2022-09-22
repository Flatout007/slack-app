import { ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";
import { Avatar, AvatarTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { AccessTime, SvgIconComponent, HelpOutlineRounded, SearchOutlined } from "@material-ui/icons"

export default function Nav(): ReactElement {
    return (
        <HeaderNav>

            <NavLeft>
                <NavAvatar></NavAvatar>
                <NavAccessTime></NavAccessTime>
            </NavLeft>

            <NavForm>
                <NavSearch></NavSearch>
                <NavInput disabled placeholder="Search Channel Name"></NavInput>
            </NavForm>

            <NavRight>
                <NavHelp></NavHelp>
            </NavRight>
        </HeaderNav>
    );
}

const HeaderNav: StyledComponent<"div", any> = styled.div`
    width: 100%;
    height: 3.5em;
    background-color: var(--slack-color);
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 200;
`;
const NavLeft: StyledComponent<"div", any> = styled.div`
    width: 200px;
    min-width: 90px;
    height: 2em;
    display: flex;
    align-items: center;
    margin-left: 16px;
    position: relative;
    justify-content: space-between;
`;
const NavRight: StyledComponent<"div", any> = styled.div`
    width: 200px;
    height: 2em;
    display: flex;
    position: relative;
    margin-left: 20em;
    flex: 0.95;
    justify-content: flex-end;
    align-items: center;
`;
const NavAvatar: StyledComponent<OverridableComponent<AvatarTypeMap<{}, "div">>, any> = styled(Avatar)`
    cursor: pointer;
    
    &:hover {
        filter: brightness(105%);
    }
`;
const NavAccessTime: StyledComponent<SvgIconComponent, any> = styled(AccessTime)`
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;
const NavForm: StyledComponent<"form", any> = styled.form`
    position: relative;
    margin-left: 2em;

    @media only screen and (min-width: 1400px) {
        margin-left: 550px;
    }
`;
const NavInput: StyledComponent<"input", any> = styled.input`
    background-color: #644365;
    width: 360px;
    height: 2em;
    border-radius: 0.4em;
    cursor: pointer;
    text-indent: 10px;

    &::placeholder {
        color: white;
        font-size: 0.9rem;
        letter-spacing: 0.01em;
    }

    &:focus {
        outline: none;
    }
`;
const NavHelp: StyledComponent<SvgIconComponent, any> = styled(HelpOutlineRounded)`
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;
const NavSearch: StyledComponent<SvgIconComponent, any> = styled(SearchOutlined)`
    color: white;
    position: absolute;
    opacity: 0.3;
    left: 13.5em;
    top: 1px;
`;
