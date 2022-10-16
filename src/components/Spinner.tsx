
import styled, { StyledComponent } from "styled-components";

export interface SpinnerProps {
}

export function Spinner(props: SpinnerProps) {
    return (
        <SpinnerContainer>
            <SpinnerTrail>
                <SpinnerCircle></SpinnerCircle>
            </SpinnerTrail>
        </SpinnerContainer>
    );
}

const SpinnerCircle: StyledComponent<"div", any> = styled.div`
    width: 1.5em;
    height: 1.5em;
    background-color: var(--slack-color);
    border-radius: 100%;
    margin-left: 155px;
    margin-top: 8px;
`;
const SpinnerTrail: StyledComponent<"div", any> = styled.div`
  width: 8em,;
  height: 12em;
  border-top: 20px solid var(--slack-color);
  border-right: 20px solid transparent;
  border-radius: 50%;
  animation-name: spinner;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const SpinnerContainer: StyledComponent<"div", any> = styled.div`
   transform: scale(0.7);
`;




