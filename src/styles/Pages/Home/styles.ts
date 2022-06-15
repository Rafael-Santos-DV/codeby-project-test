import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;

  @media only screen and (max-width: 350px) {
    flex-wrap: wrap;
    padding: 15px;
    gap: 15px;
  }
`;

export const BoxLogo = styled.div`
  display: flex;
  align-items: center;

  > a img {
    min-width: 50px;
    width: 100%;
    max-width: 100px;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;

    > a {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin: 0;
      }
    }
  }
`;

export const Navigation = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 60px;

  & * {
    font-weight: 600;
    color: ${(props) => props.theme.colors.lightWhite};
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  div.button-mobile {
    display: none;
    align-items: center;
    order: 2;
    img {
      width: 30px;
    }

    @media only screen and (max-width: 768px) {
      display: flex;
    }
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
    flex-wrap: wrap;
    column-gap: 10px;
    justify-content: space-between;

    div.button-mobile {
      order: 1;
    }
  }
`;
export const List = styled.li<{ activeMobile?: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 40px;

  @media only screen and (max-width: 768px) {
    position: absolute;
    flex-direction: column;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.white};
    right: 0;
    bottom: 0;
    top: 85px;
    width: 100%;
    max-width: 400px;
    gap: 10px;
    padding: 10px 20px;
    display: ${(props) => (props.activeMobile ? 'flex' : 'none')};
    animation: animation-side 200ms ease-out;
    border-left: 1px solid rgba(0, 0, 0, 0.05);
    z-index: 9999;

    @media only screen and (max-width: 300px) {
      top: 100px;
    }
  }

  @keyframes animation-side {
    0% {
      transform: translateX(-200%);
      opacity: 0;
    }

    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
  }

  a {
    white-space: normal;
    width: max-content;
  }
`;

export const BoxCar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  > img {
    width: 20px;
  }

  span.quant {
    background-color: ${(props) => props.theme.colors.blue};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  > h1 {
    padding: 20px 0;
    color: ${(props) => props.theme.colors.blue};
    font-size: 2rem;
  }

  @media only screen and (max-width: 768px) {
    text-align: center;
    > h1 {
      font-size: 1.8rem;
    }
  }
`;

export const ContainerProducts = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  gap: 20px;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SectionSendEmail = styled.section`
  width: 100%;
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  justify-content: space-evenly;
  padding: 30px 20px;
  align-items: center;
`;

export const BoxForm = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${(props) => props.theme.colors.white};
    padding-bottom: 15px;
    font-size: 1rem;
  }

  div {
    display: flex;
    column-gap: 20px;

    input,
    button {
      padding: 15px;
      border: none;
      border-radius: 4px;
    }

    input {
      outline: none;
      width: 300px;
    }
  }

  @media only screen and (max-width: 768px) {
    text-align: center;
    width: 100%;

    div {
      input {
        width: 100%;
      }

      button {
        width: 100%;
        max-width: 90px;
      }
    }
  }
`;

export const ContainerSocialNetwork = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  span {
    color: ${(props) => props.theme.colors.white};
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
export const BoxSocialNetwork = styled.div`
  display: flex;
  column-gap: 8px;
  img {
    width: 30px;
  }
`;

export const ContainerFooter = styled.div<{ icon1?: boolean; icon2?: boolean }>`
  width: 100%;
  background-color: #eeeeee;
  display: flex;

  padding: 30px 0;

  flex-direction: column;

  gap: 20px;

  p {
    font-size: 0.7rem;
    color: ${(props) => props.theme.colors.titleColor};
    font-weight: bold;
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    .card-two {
      border-right: 1px solid ${(props) => props.theme.colors.darkGrey};
      border-left: 1px solid ${(props) => props.theme.colors.darkGrey};
      padding: 0 120px;
    }

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card-two {
        border: none;
        padding: 0;
      }

      .activeAnimation1 {
        a {
          display: inline;
        }
      }

      .activeAnimation2 {
        div.links a {
          display: inline;
        }
      }

      > div,
      .card-two {
        width: 100%;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        a {
          display: none;
          animation: animation-links 200ms ease;
        }

        @keyframes animation-links {
          0% {
            transform: translateY(-100%);
          }

          100% {
            transform: translateY(0%);
          }
        }

        > span {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          padding-bottom: 10px;

          &[data-type='Institucional'] {
            &::after {
              content: '${(props) => (props.icon1 ? '-' : '+')}';
              position: absolute;
              right: 5px;
              font-size: 1.4rem;
              z-index: 99;
              top: 0;
            }
          }

          &[data-type='Atendimento'] {
            &::after {
              content: '${(props) => (props.icon2 ? '-' : '+')}';
              position: absolute;
              right: 5px;
              font-size: 1.4rem;
              z-index: 99;
              top: -5px;
            }
          }
        }
      }
    }
  }

  div.footer {
    text-align: center;
    padding: 4px;
  }
`;

export const BoxLogoVtex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.black};
    font-weight: 600;
    text-transform: uppercase;
  }

  img {
    width: 80px;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
