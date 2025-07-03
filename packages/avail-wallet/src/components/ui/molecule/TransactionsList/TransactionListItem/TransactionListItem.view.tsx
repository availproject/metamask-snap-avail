/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
import { CheckBoxOutlineBlankRounded, CheckBoxRounded } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Transaction } from '@types';
import { ApiPromise, initialize } from 'avail-js-sdk';
import { LoadingSmall } from 'components/ui/atom/LoadingSmall';
import { LoadingSpinner } from 'components/ui/atom/LoadingSmall/LoadingSmall.style';
import { AssetQuantity } from 'components/ui/molecule/AssetQuantity';
import { ethers } from 'ethers';
import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { useTransactionStore } from 'store/store';
import { getHumanReadableAmount, getRpcEndpoint, openExplorerTab } from 'utils/utils';

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
  api: ApiPromise | undefined;
}

export const TransactionListItemView = ({ transaction, api }: Props) => {
  const networks = useAppSelector((state) => state.networks);
  const [currencySymbol, setCurrencySymbol] = useState('AVAIL');
  const [txnValue, setTxnValue] = useState('0');
  const [txnUsdValue, setTxnUsdValue] = useState('0.00');
  const { setTransactions } = useTransactionStore();
  const metamask = useAppSelector((state) => state.metamask);

  useEffect(() => {
    const fetchData = async () => {
      const txnValues = getTxnValues(transaction);
      setTxnUsdValue(txnValues.txnUsdValue);
      setTxnValue(txnValues.txnValue);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    (async () => {
    
      const checkTxnStatus = async () => {
        if (api === undefined || transaction.block === 'finalised') {
          return;
        }
        const unsubscribe = await api.rpc.chain.subscribeFinalizedHeads(async (lastHeader) => {
          const blockHash = lastHeader.hash;
          const signedBlock = await api.rpc.chain.getBlock(blockHash);
          const { extrinsics } = signedBlock.block;

          extrinsics.forEach(async ({ hash }) => {
            if (hash.toHex() === transaction.hash) {
              await metamask?.availSnap?.api?.updateTransaction({ ...transaction, block: 'finalised' });
              setTransactions(
                (await metamask?.availSnap?.api?.getAllTransactions()!).filter(
                  (tx) => tx.network === networks.activeNetwork
                ));
              console.log('Transaction updated finally');
            
              unsubscribe();
            }
          });
        });

        const unsubNewHeads = await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
          const blockHash = lastHeader.hash;
          const signedBlock = await api.rpc.chain.getBlock(blockHash);
          const { extrinsics } = signedBlock.block;

          extrinsics.forEach(async( { hash }) => {
            if (hash.toHex() === transaction.hash) {
              await metamask?.availSnap?.api?.updateTransaction({ ...transaction, block: 'in block' });
              setTransactions(
                (await metamask?.availSnap?.api?.getAllTransactions()!).filter(
                  (tx) => tx.network === networks.activeNetwork
                ));
              console.log('Transaction updated');
            
            }
          });
        });

        return () => {
          unsubscribe();
          unsubNewHeads();
        };
      };

      checkTxnStatus();
      const intervalId = setInterval(() => {
        checkTxnStatus();
      }, 6000);

      return () => clearInterval(intervalId);
    })();
  }, []);

  //either use subscan api or just remove pending status and have inblock and finalised better to use subscan api

  const txnToFromLabel = getTxnToFromLabel(transaction);
  return (
    <Wrapper onClick={() => openExplorerTab(transaction.hash, 'extrinsic', networks.activeNetwork)}>
      <Left>
        <LeftIcon>
          <IconStyled transactionname={'Send'} icon={transaction.block === 'finalised' ? getIcon('Send') : getIcon('Loading')} />
        </LeftIcon>
        <Column>
          <Label> {transaction.block === 'finalised' ? <>Sent</> : <div   style={{ display: 'flex', alignItems: 'center', marginTop: "-16px", marginBottom:"-12px"}}><p>Sending</p> <Chip
          icon={ <LoadingSpinner icon="spinner" pulse />}
          style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}
          label={`Status: ${transaction.block.toLocaleUpperCase()}`}
          className=""
        ></Chip></div>}</Label>
          <Description>
            fee: {(Number(transaction.fee) / 10 ** 18).toString().slice(0, 5)}
          </Description>
        </Column>
      </Left>
      <Middle>{txnToFromLabel}</Middle>
      <Right>
        <AssetQuantity currency={currencySymbol} currencyValue={txnValue} />
      </Right>
    </Wrapper>
  );
};
