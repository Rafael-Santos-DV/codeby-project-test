import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { StylesGlobal } from '../styles/StylesGlobal';
import theme from '../styles/theme';
import Link from 'next/link';

// import components
import { Button } from '../components/Button/Button';
import {
  BoxCar,
  BoxForm,
  BoxLogo,
  BoxLogoVtex,
  BoxSocialNetwork,
  ContainerFooter,
  ContainerSocialNetwork,
  Footer,
  Header,
  List,
  Navigation,
  SectionSendEmail,
} from '../styles/Pages/Home/styles';

// import images
import logo from '../assets/logo.png';
import iconCar from '../assets/icon-car.svg';
import iconYt from '../assets/icon-yt.svg';
import iconFace from '../assets/icon-face.svg';
import iconLinkedin from '../assets/icon-linkedin.svg';
import { CarLink } from '../components/CardLinks/CardLInk';
import logoVtex from '../assets/logo-vtex.svg';
import hamburguer from '../assets/hambu.svg';

type AnimationType = Record<string, boolean>;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [active, setActive] = useState(false);
  const [activeAnimation, setAnimation] = useState<AnimationType>();
  const handleClickActiveMobile = () => {
    const body = document.getElementById('active-mobile');

    if (!active) {
      body?.classList.add('active-mobile');
      setActive((prev) => !prev);
      return;
    }

    setActive((prev) => !prev);
    body?.classList.remove('active-mobile');
  };

  const handleClickAnimationList = (className: string) => {
    setAnimation((prev) => ({ ...prev, [className]: !prev?.[className] }));
  };

  return (
    <ThemeProvider theme={theme}>
      <StylesGlobal />
      <Header>
        <BoxLogo>
          <Link href="/">
            <a>
              <img src={logo.src} alt="Codeby" />
            </a>
          </Link>
        </BoxLogo>

        <Navigation>
          <div className="button-mobile" onClick={handleClickActiveMobile}>
            <img src={hamburguer.src} alt="Hamburguer" />
          </div>
          <List activeMobile={active}>
            <ul>
              <Link href="/">
                <a>Home</a>
              </Link>
            </ul>
            <ul>
              <Link href="/">
                <a>Meus Produtos</a>
              </Link>
            </ul>
          </List>
          <BoxCar>
            <img src={iconCar.src} alt="Carrinho" />
            <span>CART</span>
            <span className="quant">1</span>
          </BoxCar>
        </Navigation>
      </Header>
      <Component {...pageProps} />

      <Footer>
        <SectionSendEmail>
          <BoxForm>
            <h2>FIQUE POR DENTRO DAS NOVIDADES</h2>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
              />
              <Button type="submit">Assinar</Button>
            </div>
          </BoxForm>
          <ContainerSocialNetwork>
            <span>Siga a gente!</span>

            <BoxSocialNetwork>
              <Link href="/">
                <a>
                  <img src={iconFace.src} alt="Facebook" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <img src={iconYt.src} alt="Youtube" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <img src={iconLinkedin.src} alt="Linkedin" />
                </a>
              </Link>
            </BoxSocialNetwork>
          </ContainerSocialNetwork>
        </SectionSendEmail>
        <ContainerFooter
          icon1={activeAnimation?.activeAnimation1}
          icon2={activeAnimation?.activeAnimation2}
        >
          <div>
            <CarLink
              onClick={() => handleClickAnimationList('activeAnimation1')}
              title="Institucional"
              className={
                activeAnimation?.activeAnimation1 ? 'activeAnimation1' : ''
              }
            >
              <Link href="/">
                <a>Quem somos</a>
              </Link>
              <Link href="/">
                <a>Nossas Lojas</a>
              </Link>
            </CarLink>

            <CarLink
              onClick={() => handleClickAnimationList('activeAnimation2')}
              title="Atendimento"
              className={`card-two ${
                activeAnimation?.activeAnimation2 ? 'activeAnimation2' : ''
              }`}
            >
              <Link href="/">
                <a>Central de atendimento</a>
              </Link>
              <Link href="/">
                <a>Trocas e devoluções</a>
              </Link>
              <Link href="/">
                <a>Política de privacidade</a>
              </Link>
            </CarLink>

            <BoxLogoVtex>
              <span>POWERED BY</span>
              <img src={logoVtex.src} alt="Vtex" />
            </BoxLogoVtex>
          </div>
          <div className="footer">
            <p>© 2019, CODEBY | TECNOLOGIA PARA NEGÓCIOS POWERED BY VTEX</p>
          </div>
        </ContainerFooter>
      </Footer>
    </ThemeProvider>
  );
};

export default App;
