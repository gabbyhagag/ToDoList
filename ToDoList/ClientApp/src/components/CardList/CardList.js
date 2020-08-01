import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';

export const CardList = (props) => {
    return (
        <StyledCardListDiv className='card-list'>
            {props.missions.map((mission) => (
                <StyledCard key={mission.id} mission={mission} />
            ))}
            {props.isLoadingCreate && <StyledCard loadingCard />}
        </StyledCardListDiv>
    );
};

const StyledCard = styled(Card)``;

const StyledCardListDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;
