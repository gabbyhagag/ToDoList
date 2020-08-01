import styled from 'styled-components';

// only styled components
export const Grid = styled.div`
    /* border: 1px solid black; */
`;

export const Row = styled.div`
    display: flex;
    /* border: 1px solid black; */
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    gap: ${(props) => props.gap};
    ${(props) =>
        props.collapse &&
        media[props.collapse](`
        flex-direction: column
    `)}
`;

const media = {
    xs: (styles) => `
        @media only screen and (max-width: 600px) {
            ${styles}
        }
    `,
    lg: (styles) => `
        @media only screen and (max-width: 1200px) {
            ${styles}
        }
    `,
};

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.size};
    /* border: 1px solid black; */
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    gap: ${(props) => props.gap};
    ${(props) =>
        props.collapse &&
        media[props.collapse](`
        flex: 2;
    `)}
`;
