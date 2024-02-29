import { openExplorerTab } from 'utils/utils';
import { useAppSelector } from 'hooks/redux';
import { useAvailSnap } from 'services/metamask';
import {
  AccountImageDiv,
  AccountImageStyled,
  AddressCopy,
  AddressQrCode,
  ButtonDiv,
  ButtonStyled,
  Title,
  TitleDiv,
  Wrapper
} from './AccountDetailsModal.style';

interface Props {
  address: string;
}

export const AccountDetailsModalView = ({ address }: Props) => {
  const networks = useAppSelector((state) => state.networks);
  const { getPrivateKeyFromAddress } = useAvailSnap();
  const chainId = networks?.items[networks.activeNetwork]?.chainId;
  return (
    <div>
      <AccountImageDiv>
        <AccountImageStyled size={64} address={address} />
      </AccountImageDiv>
      <Wrapper>
        <TitleDiv>
          <Title>My account</Title>
          {/* <ModifyIcon /> */}
        </TitleDiv>
        <AddressQrCode value={address} />
        {/* <AddressCopy address={address} /> */}
      </Wrapper>
      <ButtonDiv>
        <ButtonStyled onClick={() => openExplorerTab(address, 'contract', chainId)}>
          VIEW ON EXPLORER
        </ButtonStyled>
        {/* <ButtonStyled
          backgroundTransparent
          borderVisible
          onClick={() => getPrivateKeyFromAddress()}
        >
          EXPORT PRIVATE KEY
        </ButtonStyled> */}
      </ButtonDiv>
    </div>
  );
};
