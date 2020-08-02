import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const Spinner = () => {
    return (
        <Centered>
            <Blob blobLeft></Blob>
            <Blob blobRight></Blob>
        </Centered>
    );
};

// <StayledIcon icon={faCog} spin />

export default Spinner;

// const StayledIcon = styled(FontAwesomeIcon)`
//     font-size: 2rem;
// `;

const Centered = styled.div`
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    filter: blur(10px) contrast(20);
`;

const Blob = styled.div`
    width: 70px;
    height: 70px;
    position: absolute;
    background: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${(props) =>
        props.blobLeft &&
        css`
            left: 20%;
            animation: ${oscL} 2.5s ease infinite;
        `}

    ${(props) =>
        props.blobRight &&
        css`
            left: 80%;
            animation: ${oscR} 2.5s ease infinite;
            background: #0ff;
        `}
`;

const oscL = keyframes`
    0%{left:20%;}
    50%{left:50%;}
    100%{left:20%;}
`;
const oscR = keyframes`
    0%{left:80%;}
    50%{left:50%;}
    100%{left:80%;}
`;
