import React from 'react';
import styled from 'styled-components';

import Spinner from '../Base/Spinner';

export const Card = (props) => (
    <CardContainer>
        {props.loadingCard ? <Spinner /> : <StayledImg alt='mission' src={props.mission.imageUrl} />}
        {props.loadingCard ? <StayledH3>Loading...</StayledH3> : <StayledH3>{props.mission.title}</StayledH3>}
    </CardContainer>
);

const CardContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 2px double #efefef;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 1px 1px 5px 2px rgba(245, 245, 245, 1);

    &:hover {
        background-color: darken(0.2, '#F5F5F5');
        box-shadow: 0px 0px 11px 2px rgba(245, 245, 245, 1);
    }
`;

const StayledImg = styled.img`
    height: 200px;
    @media only screen and (max-width: 600px) {
        height: auto;
        width: 100%;
    }
`;

const StayledH3 = styled.h3`
    color: ${(props) => props.theme.colors.darkGray};
`;
