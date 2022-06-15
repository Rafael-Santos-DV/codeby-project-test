export default function formatPricePtBr(price: number, cipher?: boolean) {
  return price
    .toLocaleString('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    })
    .replace(cipher ? '' : 'R$', '');
}
