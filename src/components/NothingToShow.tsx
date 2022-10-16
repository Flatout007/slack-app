import * as React from 'react';
import styled, { StyledComponent } from 'styled-components';

export interface NothingToShowProps {
}

export function NothingToShow(props: NothingToShowProps) {
    return (
        <NothingToShowContainer>
            <NothingToShowDiv>
                <NothingToShowH1>Nothing to show Right Now</NothingToShowH1>
                <NothingToShowP>Create a channel and be the first to send a message...</NothingToShowP>
            </NothingToShowDiv>

        </NothingToShowContainer>

    );
}

const NothingToShowContainer: StyledComponent<"div", any> = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const NothingToShowDiv: StyledComponent<"div", any> = styled.div`
    
`;
const NothingToShowH1: StyledComponent<"h1", any> = styled.h1`
    
`;
const NothingToShowP: StyledComponent<"p", any> = styled.p`
    
`;