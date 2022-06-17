import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
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
import buttonX from '../assets/button-x.svg';

import { ProductOfCar } from '../components/ProductOfCar/ProductOfCar';
import formatPricePtBr from '../utils/formatPricePtBr';
import ContextProvider from '../context/ContextProvider';
import { getCookie, setCookies } from 'cookies-next';
import { ItemsProducts } from '../types/DataTypeProduct';
import { useData } from '../hooks/useData';

type AnimationType = Record<string, boolean>;
type ProductCarType = {
  productId: string;
  productName: string;
  item: ItemsProducts;
  amount: number;
};

const App: React.FC<AppProps & NextPage> = ({ Component, pageProps }) => {
  const [active, setActive] = useState(false);
  const [activeSidebarCar, setActiveSidebarCar] = useState(false);
  const [activeAnimation, setAnimation] = useState<AnimationType>();
  const data = useData();

  const [productsCar, setProductsCar] = useState<
    Record<string, ProductCarType>
  >({});

  const [getAmount, setAmount] = useState<Record<string, number>>({});

  const [getTotal, setTotal] = useState(0);

  const [effectRefresh, setRefresh] = useState(false);

  useEffect(() => {
    const productsId = getCookie('codeby-products-car');

    if (productsId) {
      const parseCookie = String(productsId);

      if (!parseCookie) return;

      const ProductsOfCar = JSON.parse(parseCookie);

      data?.forEach((value) => {
        const { items, productName } = value;

        items.forEach((item) => {
          const { itemId: productId } = item;

          const dataItem = items[ProductsOfCar?.[productId]?.[2]];
          const amount = ProductsOfCar?.[productId]?.[1];
          const idOfProduct = ProductsOfCar?.[productId]?.[0];

          if (item.itemId.includes(idOfProduct) && amount && idOfProduct) {
            setProductsCar((prev) => ({
              ...prev,
              [productId]: {
                productId,
                productName,
                item: dataItem,
                amount,
              },
            }));
          }
        });
      });

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal(
          (prev) =>
            prev + value.item?.sellers[0].commertialOffer.Price * value.amount
        );

        setAmount((prev) => ({ ...prev, [value.productId]: value.amount }));
      });
    }
  }, [effectRefresh, data]);

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

  const handleChangeRemoveProduct = (productId: string, index: number) => {
    const productsId = JSON.parse(String(getCookie('codeby-products-car')));

    const element = productsId?.[productId];

    if (element && element[1] >= 1) {
      let newParseProductsCar = {
        ...productsId,
        [productId]: [productId, Number(element[1]) - 1, index],
      };

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal((prev) => prev - value.item?.sellers[0].commertialOffer.Price);
      });

      setAmount((prev) => ({ ...prev, [productId]: prev[productId]-- }));

      setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
        maxAge: 60 * 60 * 24,
      });

      return;
    }

    setRefresh((prev) => !prev);
  };

  const handleChangeAddProduct = (productId: string, index: number) => {
    const productsId = JSON.parse(String(getCookie('codeby-products-car')));

    const element = productsId?.[productId];

    if (element) {
      let newParseProductsCar = {
        ...productsId,
        [productId]: [productId, Number(element[1]) + 1, index],
      };

      Object.values(productsCar).forEach((value: ProductCarType) => {
        setTotal((prev) => value.item?.sellers[0].commertialOffer.Price + prev);
      });

      setAmount((prev) => ({ ...prev, [productId]: prev[productId]++ }));

      setCookies('codeby-products-car', JSON.stringify(newParseProductsCar), {
        maxAge: 60 * 60 * 24,
      });

      return;
    }

    setRefresh((prev) => !prev);
  };

  return (
    <ContextProvider>
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
              <img
                src={hamburguer.src}
                alt="Hamburguer"
                style={{ display: !active ? 'flex' : 'none' }}
              />
              <img
                src={buttonX.src}
                alt="Exit"
                style={{ display: active ? 'flex' : 'none' }}
              />
            </div>
            <List activeMobile={active} onClick={handleClickActiveMobile}>
              <ul>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </ul>
              <ul>
                <Link href="/products">
                  <a>Meus Produtos</a>
                </Link>
              </ul>
            </List>
            <BoxCar onClick={handleClickActiveSidebarCar}>
              <img src={iconCar.src} alt="Carrinho" />
              <span>CART</span>
              <span className="quant">{Object.values(productsCar).length}</span>
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
                {productsCar &&
                  Object.values(productsCar).map(
                    (value: ProductCarType, index) => (
                      <ProductOfCar
                        amount={getAmount[value.productId]}
                        key={value.productId}
                        imageUrl={String(value.item?.images[0].imageUrl)}
                        newPrice={Number(
                          value.item?.sellers[0].commertialOffer.Price
                        )}
                        oldPrice={Number(
                          value.item?.sellers[0].commertialOffer.Price
                        )}
                        productName={String(value.item?.nameComplete)}
                        onClickButtonMinus={() =>
                          handleChangeRemoveProduct(value.productId, index)
                        }
                        onClickButtonPlus={() =>
                          handleChangeAddProduct(value.productId, index)
                        }
                      />
                    )
                  )}
              </ContainerProductsOfCar>
              <ContainerAmount>
                <div>
                  <span>Total:</span>
                  <span>{formatPricePtBr(getTotal, true)}</span>
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
    </ContextProvider>
  );
};

export default App;
