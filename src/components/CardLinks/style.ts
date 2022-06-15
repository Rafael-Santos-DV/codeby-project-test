import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    color: ${(props) => props.theme.colors.titleColor};
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
  }

  div {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    a {
      font-size: 0.9rem;
      color: ${(props) => props.theme.colors.titleColor};
    }
  }
`;
