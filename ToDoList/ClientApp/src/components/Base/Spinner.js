import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
    return <StayledIcon icon={faCog} spin />;
};

export default Spinner;

const StayledIcon = styled(FontAwesomeIcon)`
    font-size: 2rem;
`;
