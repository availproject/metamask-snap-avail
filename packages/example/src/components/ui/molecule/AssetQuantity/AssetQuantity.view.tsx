import { Currency, Size, Wrapper } from './AssetQuantity.style';

interface Props {
  currency?: string;
  currencyValue: string;
  centered?: boolean;
  size?: Size;
}

export const AssetQuantityView = ({
  currency = 'AVL',
  currencyValue,
  centered,
  size = 'normal'
}: Props) => {
  return (
    <Wrapper centered={centered}>
      <Currency size={size}>
        {currencyValue}&nbsp;
        {currency}
      </Currency>
      {/* {USDValue && <Dollars size={size}>{USDValue} USD</Dollars>} */}
    </Wrapper>
  );
};
