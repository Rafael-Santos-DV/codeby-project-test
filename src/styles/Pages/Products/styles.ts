import styled from 'styled-components';

export const MainProduct = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  padding: 20px;
  max-width: 500px;
  box-shadow: 0px 0px 5px ${(props) => props.theme.colors.blackTransparent};
  margin-bottom: 20px;
  row-gap: 10px;

  h1 {
    color: ${(props) => props.theme.colors.blue};
    font-size: 2rem;
  }
`;

export const ContainerProducts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 10px;
  border-radius: 4px;
  row-gap: 10px;
`;

export const ContainerFooter = styled.footer`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const BoxAmount = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InformationShipping = styled.div`
  width: 100%;
  max-width: 350px;
  background: ${(props) => props.theme.colors.green};
  border-radius: 10px;
  color: ${(props) => props.theme.colors.greenDark};
  font-size: 1rem;
  padding: 4px;
`;

export const BoxButton = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.blackTransparent};
  padding: 10px 0;
  > button {
    width: 100%;
    background-color: ${(props) => props.theme.colors.blue};
    max-width: 400px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1.1rem;
    transition: filter 200ms ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
