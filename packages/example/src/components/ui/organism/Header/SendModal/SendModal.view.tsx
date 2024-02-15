import { useCallback, useState } from 'react';
import { AmountInput } from 'components/ui/molecule/AmountInput';
import { useAppSelector } from 'hooks/redux';
import { ethers } from 'ethers';
import Toastr from 'toastr2';
import { AddressInput } from 'components/ui/molecule/AddressInput';
import { isValidAddress } from 'utils/utils';
import { SendSummaryModal } from '../SendSummaryModal';
import { Bold, Normal } from '../../ConnectInfoModal/ConnectInfoModal.style';
import {
  Buttons,
  ButtonStyled,
  Header,
  MessageAlert,
  Network,
  Separator,
  SeparatorSmall,
  Title,
  Wrapper
} from './SendModal.style';

interface Props {
  closeModal?: () => void;
}

export const SendModalView = ({ closeModal }: Props) => {
  const networks = useAppSelector((state) => state.networks);
  const wallet = useAppSelector((state) => state.wallet);
  const metamask = useAppSelector((state) => state.metamask);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [fields, setFields] = useState({
    amount: '',
    address: '',
    chainId: networks.items.length > 0 ? networks.items[networks.activeNetwork].chainId : ''
  });
  const [errors, setErrors] = useState({ amount: '', address: '' });

  const toastr = new Toastr({
    closeDuration: 10000000,
    showDuration: 1000000000,
    positionClass: 'toast-top-center'
  });

  const handleChange = (fieldName: string, fieldValue: string) => {
    //Check if input amount does not exceed user balance
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: ''
    }));
    switch (fieldName) {
      case 'amount':
        if (fieldValue !== '' && fieldValue !== '.') {
          const inputAmount = ethers.utils.parseUnits(fieldValue, wallet.tokenBalance.decimals);
          const userBalance = wallet.tokenBalance.amount;
          if (inputAmount.gt(userBalance)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              amount: 'Input amount exceeds user balance'
            }));
          }
        }
        break;
      case 'address':
        if (fieldValue !== '') {
          if (!isValidAddress(fieldValue)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              address: 'Invalid address format'
            }));
          }
        }
        break;
    }

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: fieldValue
    }));
  };

  const confirmEnabled = () => {
    return (
      !errors.address && !errors.amount && fields.amount.length > 0 && fields.address.length > 0
    );
  };

  const transferTokens = async () => {
    try {
      if (fields.address && fields.amount && metamask.polkadotSnap.api) {
        const amountBN = ethers.utils.parseUnits(fields.amount, wallet.tokenBalance.decimals);
        const txPayload = await metamask.polkadotSnap.api.generateTransactionPayload(
          fields.amount,
          fields.address
        );
        const signedTx = await metamask.polkadotSnap.api.signPayloadJSON(txPayload.payload);
        const tx = await metamask.polkadotSnap.api.send(signedTx, txPayload);
        toastr.success(`Transaction: ${JSON.stringify(tx, null, 2)}`);
      } else {
        toastr.error('Please fill recipient and amount fields.');
      }
    } catch (e) {
      toastr.error('Error while sending the transaction');
    } finally {
      closeModal;
    }
  };

  return (
    <>
      {!summaryModalOpen && (
        <div>
          <Wrapper>
            <Header>
              <Title>Send</Title>
            </Header>
            <Network>
              <Normal>Network</Normal>
              <Bold>{networks.items[networks.activeNetwork].displayName}</Bold>
            </Network>
            <AddressInput
              label="To"
              placeholder="Paste recipient address here"
              onChange={(value) => handleChange('address', value.target.value)}
            />
            <SeparatorSmall />
            <MessageAlert
              variant="info"
              text="Please only enter a valid Avail address. Sending funds to a different network might result in permanent loss."
            />
            <Separator />
            <AmountInput
              label="Amount"
              onChangeCustom={(value) => handleChange('amount', value)}
              error={errors.amount !== '' ? true : false}
              helperText={errors.amount}
              decimalsMax={wallet.tokenBalance.decimals}
              asset={wallet.tokenBalance}
            />
          </Wrapper>
          <Buttons>
            <ButtonStyled onClick={closeModal} backgroundTransparent borderVisible>
              CANCEL
            </ButtonStyled>
            <ButtonStyled onClick={() => transferTokens()} enabled={confirmEnabled()}>
              CONFIRM
            </ButtonStyled>
          </Buttons>
        </div>
      )}

      {summaryModalOpen && (
        <SendSummaryModal
          closeModal={closeModal}
          address={fields.address}
          amount={fields.amount}
          chainId={fields.chainId}
        />
      )}
    </>
  );
};
