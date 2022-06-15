import styled from 'styled-components';

export const ButtonElement = styled.button`
  width: 100%;
  max-width: 140px;
  background: ${(props) => props.theme.colors.lightBlack};
  border: none;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
