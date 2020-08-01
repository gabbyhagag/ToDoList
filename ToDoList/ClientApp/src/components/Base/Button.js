import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import styledProps from 'styled-props';

export const Button = styled.button`
    width: 100%;
    padding: 10px 10px;
    position: relative;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.lightGray};


    ${(props) =>
        props.default &&
        css`
            color: ${(props) => props.theme.colors.black};
            background-color: ${(props) => props.theme.colors.white};
        `}

    ${(props) =>
        props.primary &&
        css`
            color: ${(props) => props.theme.colors.white};
            background-color: ${(props) => props.theme.colors.primary};
        `}

    ${(props) =>
        props.secondary &&
        css`
            color: ${(props) => props.theme.colors.white};
            background-color: ${(props) => props.theme.colors.secondary};
        `}

    ${(props) =>
        props.danger &&
        css`
            color: ${(props) => props.theme.colors.white};
            background-color: ${(props) => props.theme.colors.danger};
        `}

    ${(props) =>
        props.info &&
        css`
            color: ${(props) => props.theme.colors.white};
            background-color: ${(props) => props.theme.colors.info};
        `}

    &:hover,
    &:focus {
        background-color: ${(props) => lighten(0.05, styledProps(props.theme.colors)(props))}; 
        box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.lightGray};
    }
`;
