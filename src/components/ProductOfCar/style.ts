import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.blackTransparent};
  border-top: 1px solid ${(props) => props.theme.colors.blackTransparent};
`;

export const BoxImage = styled.div`
  display: flex;

  img {
    width: 100%;
    max-width: 90px;
    object-fit: contain;
  }
`;

export const InformationProduct = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  font-size: 0.9rem;

  @media screen and (max-width: 568px) {
    font-size: 0.7rem;
  }
`;

export const OldPrice = styled.div`
  font-size: 0.8rem;
  display: flex;
  column-gap: 5px;
  align-items: center;

  span {
    text-decoration: line-through;
    color: ${(props) => props.theme.colors.darkGrey};
  }

  abbr {
    width: 18px;
    height: 18px;
    background: ${(props) => props.theme.colors.darkGrey};
    color: ${(props) => props.theme.colors.white};
    font-size: 0.6rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CurrentPrice = styled.div`
  display: flex;
  align-items: center;

  span,
  abbr {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
  }
  abbr {
    width: 22px;
    height: 22px;
    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }

  @media screen and (max-width: 500px) {
    span,
    abbr {
      font-size: 0.8rem;
    }
  }
`;

export const IncreaseOrDecrease = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  button,
  span {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.8rem;

    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};

    @media screen and (max-width: 500px) {
      width: 22px;
      height: 22px;
    }
  }

  span {
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`;
