import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { createContext, useEffect, useState } from 'react';
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
import { getCookie, setCookies } from 'cookies-next';
import ResponseProducts from '../types/DataTypeProduct';
import { useData } from '../hooks/useData';
import { CartProductsType } from '../schemas/cartProducts';
import { ApiCode } from '../service/api';
import { toast } from 'react-toastify';

type AnimationType = Record<string, boolean>;
type ProductCarType = {
  productId: string;
  amount: number;
  imageUrl: string;
  newPrice: number;
  oldPrice: number;
  productName: string;
};

type GlobalDataType = {
  data: ResponseProducts[];
  getTotal: number;
  productsCart: ProductCarType[] | undefined;
  codebyCookies: string | undefined;
  setRefreshGlobal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeRemoveProduct: (productId: string) => void;
  handleChangeAddProduct: (productId: string, index: number) => void;
};

export const ContextAppProvider = createContext({} as GlobalDataType);

const App: React.FC<AppProps & NextPage> = ({ Component, pageProps }) => {
  const codebyCookies = String(getCookie('codeby-products-cart'));
  const [active, setActive] = useState(false);
  const [activeSidebarCar, setActiveSidebarCar] = useState(false);
  const [activeAnimation, setAnimation] = useState<AnimationType>();
  const data = useData({ path: '/products' }) as ResponseProducts[];

  const [refreshGlobal, setRefreshGlobal] = useState(false);

  const dataCart = useData({
    path: '/showCart',
    cartId: String(codebyCookies),
    refresh: refreshGlobal,
  }) as CartProductsType;

  const [productsCart, setProductsCart] = useState<ProductCarType[]>();

  const [getTotal, setTotal] = useState(0);

  useEffect(() => {
    if (codebyCookies) {
      let values: ProductCarType[] = [];
      let total = 0;

      data?.forEach((products) => {
        const { items } = products;

        items?.forEach((product) => {
          dataCart?.products?.forEach((item) => {
            const { images, sellers, nameComplete } = product;

            if (item.productId === product.itemId) {
              values.push({
                amount: item.amount,
                imageUrl: images[0].imageUrl, // url will always be at index 0
                newPrice: sellers[0].commertialOffer.PriceWithoutDiscount, // priceWD will always be at index 0
                oldPrice: sellers[0].commertialOffer.Price, // old price will always be at index 0
                productName: nameComplete,
                productId: item.productId,
              });

              total +=
                item.amount *
                product.sellers[0].commertialOffer.PriceWithoutDiscount;
            }
          });
        });
      });

      setProductsCart(values);
      setTotal(total);
    }
  }, [data, codebyCookies, dataCart, codebyCookies]);

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

  const handleChangeRemoveProduct = async (productId: string) => {
    try {
      await ApiCode.post('/removeProductCart', {
        productId,
        cartId: codebyCookies,
      });

      setRefreshGlobal((prev) => !prev);
      setCookies('codeby-products-cart', codebyCookies, {
        maxAge: 60 * 60 * 24,
      });
    } catch (err) {
      toast.error('Erro interno!');
    }
  };

  const handleChangeAddProduct = async (productId: string, index: number) => {
    try {
      const response = await ApiCode.post('/addProductCart', {
        productId,
        indexCart: index,
        cartId: codebyCookies,
      });

      setRefreshGlobal((prev) => !prev);
      setCookies('codeby-products-cart', response.data.cartId, {
        maxAge: 60 * 60 * 24,
      });
    } catch (err) {
      toast.error('Erro interno!');
    }
  };

  return (
    <ContextAppProvider.Provider
      value={{
        setRefreshGlobal,
        codebyCookies,
        getTotal,
        data,
        productsCart,
        handleChangeAddProduct,
        handleChangeRemoveProduct,
      }}
    >
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
              <span className="quant">{productsCart?.length ?? 0}</span>
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
                {productsCart &&
                  productsCart.map((product, index) => (
                    <ProductOfCar
                      amount={product.amount}
                      key={product.productId}
                      imageUrl={String(product.imageUrl)}
                      newPrice={Number(product.newPrice)}
                      oldPrice={Number(product.oldPrice)}
                      productName={String(product.productName)}
                      onClickButtonMinus={() =>
                        handleChangeRemoveProduct(product.productId)
                      }
                      onClickButtonPlus={() =>
                        handleChangeAddProduct(product.productId, index)
                      }
                    />
                  ))}
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
    </ContextAppProvider.Provider>
  );
};

export default App;
