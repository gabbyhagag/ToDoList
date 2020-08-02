import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';

export const CardList = ({ isLoadingCreate, missions }) => {
    return (
        <StyledCardListDiv>
            {missions.map((mission) => (
                <StyledCard key={mission.id} mission={mission} />
            ))}
            {isLoadingCreate && <StyledCard loadingCard />}
        </StyledCardListDiv>
    );
};

const StyledCard = styled(Card)``;

const StyledCardListDiv = styled.ul`
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;
