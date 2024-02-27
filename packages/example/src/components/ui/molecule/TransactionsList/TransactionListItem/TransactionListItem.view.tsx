import { Transaction } from '@types';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { AssetQuantity } from 'components/ui/molecule/AssetQuantity';
import { getHumanReadableAmount, openExplorerTab } from 'utils/utils';
import {
  Column,
  Description,
  IconStyled,
  Label,
  Left,
  LeftIcon,
  Middle,
  Right,
  Wrapper
} from './TransactionListItem.style';
import { getIcon, getTxnToFromLabel, getTxnValues } from './types';

interface Props {
  transaction: Transaction;
}

export const TransactionListItemView = ({ transaction }: Props) => {
  const wallet = useAppSelector((state) => state.wallet);
  const [currencySymbol, setCurrencySymbol] = useState('AVAIL');
  const [txnValue, setTxnValue] = useState('0');
  const [txnUsdValue, setTxnUsdValue] = useState('0.00');

  useEffect(() => {
    const fetchData = async () => {
      const txnValues = getTxnValues(transaction);
      setTxnUsdValue(txnValues.txnUsdValue);
      setTxnValue(txnValues.txnValue);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const txnToFromLabel = getTxnToFromLabel(transaction);
  return (
    <Wrapper onClick={() => openExplorerTab(transaction.hash, 'extrinsic')}>
      <Left>
        <LeftIcon>
          <IconStyled transactionname={'Send'} icon={getIcon('Send')} />
        </LeftIcon>
        <Column>
          <Label>{'Send'}</Label>
          {/* <Description>{transaction.fee}</Description> */}
        </Column>
      </Left>
      <Middle>{txnToFromLabel} </Middle>
      <Right>
        <AssetQuantity currency={currencySymbol} currencyValue={txnValue} />
      </Right>
    </Wrapper>
  );
};
