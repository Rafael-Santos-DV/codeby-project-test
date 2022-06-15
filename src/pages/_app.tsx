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
  BoxSidebar,
  BoxSocialNetwork,
  ContainerAmount,
  ContainerFooter,
  ContainerProductsOfCar,
  ContainerSocialNetwork,
  Footer,
  Header,
  List,
  Navigation,
  SectionSendEmail,
  SideProductsOfCard,
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
import iconsSide from '../assets/icon-sidebar.svg';
import { ProductOfCar } from '../components/ProductOfCar/ProductOfCar';
import formatPricePtBr from '../utils/formatPricePtBr';

type AnimationType = Record<string, boolean>;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [active, setActive] = useState(false);
  const [activeSidebarCar, setActiveSidebarCar] = useState(false);
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

  const handleClickActiveSidebarCar = () => {
    const body = document.getElementById('active-mobile') as HTMLBodyElement;

    if (!activeSidebarCar) {
      body.classList.add('active-sidebarCar');
      setActiveSidebarCar(true);
      return;
    }

    setActiveSidebarCar(false);
    body.classList.remove('active-sidebarCar');
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
          <BoxCar onClick={handleClickActiveSidebarCar}>
            <img src={iconCar.src} alt="Carrinho" />
            <span>CART</span>
            <span className="quant">1</span>
          </BoxCar>

          <SideProductsOfCard activeSidebar={activeSidebarCar}>
            <BoxSidebar>
              <button type="button" onClick={handleClickActiveSidebarCar}>
                <img src={iconsSide.src} alt="Remover" />
              </button>

              <div>
                <h2>Meu Carrinho</h2>
              </div>
            </BoxSidebar>

            <ContainerProductsOfCar>
              <ProductOfCar
                imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
                newPrice={200}
                oldPrice={300}
                productName="Camisa Jess"
                amount={2}
              />
              <ProductOfCar
                imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
                newPrice={200}
                oldPrice={300}
                productName="Camisa Jess"
                amount={2}
              />
              <ProductOfCar
                imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
                newPrice={200}
                oldPrice={300}
                productName="Camisa Jess"
                amount={2}
              />

              <ProductOfCar
                imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
                newPrice={200}
                oldPrice={300}
                productName="Camisa Jess"
                amount={2}
              />
            </ContainerProductsOfCar>
            <ContainerAmount>
              <div>
                <span>Total:</span>
                <span>{formatPricePtBr(200.5, true)}</span>
              </div>

              <Button>Finalizar Compra</Button>
            </ContainerAmount>
          </SideProductsOfCard>
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
