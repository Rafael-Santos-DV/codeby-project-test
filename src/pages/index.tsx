import type { NextPage } from 'next';
import Head from 'next/head';
import { ContainerProducts, Main } from '../styles/Pages/Home/styles';

import { BoxOfProduct } from '../components/BoxOfProduct/BoxOfProduct';

const Home: React.FC<NextPage> = () => {
  return (
    <div>
      <Head>
        <title>Teste Codeby</title>
        <meta name="description" content="Testing codeby in NextJs" />
      </Head>
      <Main>
        <h1>Nossos Produtos</h1>
        <ContainerProducts>
          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />

          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />

          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />

          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />

          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />

          <BoxOfProduct
            imageUrl="https://images.tcdn.com.br/img/img_prod/619185/180_t_shirt_feminina_sarcasm_537_1_58eff6dac6b12d3b232e0de7a251c3d7.jpg"
            installments={3}
            newPrice={200}
            oldPrice={300}
            productId={'92842984'}
            productName="Camisa"
          />
        </ContainerProducts>
      </Main>
    </div>
  );
};

export default Home;
