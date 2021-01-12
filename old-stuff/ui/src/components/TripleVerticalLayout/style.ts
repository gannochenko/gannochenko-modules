import styled from 'styled-components';

export const TripleVerticalLayoutRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const Header = styled.header`
    flex-shrink: 0;
`;

export const Main = styled.main`
    flex-grow: 2;
`;

export const Footer = styled.footer`
    flex-shrink: 0;
`;
