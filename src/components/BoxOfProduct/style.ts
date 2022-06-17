import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 250px;
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  /* height: max-content; */

  @media only screen and (max-width: 400px) {
    max-width: 92%;
  }

  @media (min-width: 401px) and (max-width: 467px) {
    max-width: 180px;
  }

  @media (min-width: 449px) and (max-width: 568px) {
    max-width: 210px;
  }

  // or tag 'a'
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.box-image {
      width: 100%;
      max-width: 220px;
      overflow: hidden;

      img {
        width: 100%;
        min-height: 24vh;
        max-height: 24vh;
        transition: transform 200ms ease;
        object-fit: contain;
      }
    }
  }

  &:hover {
    div.product-name {
      background-color: ${(props) => props.theme.colors.black};

      strong {
        color: ${(props) => props.theme.colors.white};
      }
    }

    div.box-image {
      img {
        transform: scale(1.04);
      }
    }
  }
`;

export const BoxInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin: 5px 0 15px 0;
  transition: background 200ms ease-in;

  strong {
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
    font-size: 0.8rem;
  }
`;

export const OldPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;

  abbr {
    background: ${(props) => props.theme.colors.darkGrey};
    color: ${(props) => props.theme.colors.white};
    border-radius: 50%;
    font-size: 0.6rem;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    text-decoration: line-through;
    color: ${(props) => props.theme.colors.darkGrey};
  }
`;

export const NewPrice = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-bottom: 10px;
  text-align: center;
  justify-content: center;

  abbr {
    width: 25px;
    height: 25px;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.black};
    font-size: 0.8rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;

    @media only screen and (max-width: 390px) {
      font-size: 1rem;
    }
  }
`;

export const InfoInstallments = styled.footer`
  color: ${(props) => props.theme.colors.darkGrey};
  strong {
    color: ${(props) => props.theme.colors.black};
    opacity: 0.5;
    font-size: 0.8rem;
  }
`;
