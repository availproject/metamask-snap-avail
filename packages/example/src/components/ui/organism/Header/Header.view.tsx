import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { theme } from 'theme/default';
import { Button } from 'components/ui/atom/Button';
import { AssetQuantity } from 'components/ui/molecule/AssetQuantity';
import { PopIn } from 'components/ui/molecule/PopIn';
import { Menu } from '@headlessui/react';
import { AccountAddress } from 'components/ui/molecule/AccountAddress';
import { getAmountPrice, getHumanReadableAmount, openExplorerTab } from 'utils/utils';
import { TOKEN_BALANCE_REFRESH_FREQUENCY } from 'utils/constants';
import {
  setWalletConnection,
  setForceReconnect,
  setErc20TokenBalanceSelected,
  resetWallet,
  clearAccounts
} from 'slices/walletSlice';
import { resetNetwork, setActiveNetwork } from 'slices/networkSlice';
import { ConnectInfoModal } from '../ConnectInfoModal';
import { AccountDetailsModal } from '../AccountDetailsModal';
import {
  AccountDetailButton,
  AccountDetails,
  AccountDetailsContent,
  AccountImageStyled,
  RowDiv,
  InfoIcon,
  PopInStyled,
  Buttons,
  HeaderButton,
  Wrapper,
  SendButton,
  InternalWrapper,
  Left,
  Right,
  MenuItems,
  MenuSection,
  MenuItemText,
  MenuDivider,
  MenuIcon,
  Badge
} from './Header.style';
import { ReceiveModal } from './ReceiveModal';
import { SendModal } from './SendModal';

interface Props {
  address: string;
}

export const HeaderView = ({ address }: Props) => {
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const networks = useAppSelector((state) => state.networks);
  const chainId = networks?.items[networks.activeNetwork]?.chainId;
  const wallet = useAppSelector((state) => state.wallet);
  const metamaskState = useAppSelector((state) => state.metamask);
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const timeoutHandle = useRef(setTimeout(() => {}));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const chain = networks.items[networks.activeNetwork]?.chainId;
    if (chain && address) {
      const interval = setInterval(async () => {
        if (metamaskState?.polkadotSnap?.api) {
          const newBalance = await metamaskState?.polkadotSnap?.api?.getBalance();
          dispatch(
            setErc20TokenBalanceSelected({
              ...wallet.tokenBalance,
              amount: newBalance
            })
          );
        }
      }, TOKEN_BALANCE_REFRESH_FREQUENCY); // every 60 seconds
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networks.activeNetwork, wallet.tokenBalance, setErc20TokenBalanceSelected]);

  const handleSendClick = () => {
    setSendOpen(true);
  };

  function disconnect() {
    dispatch(setWalletConnection(false));
    dispatch(setForceReconnect(true));
    dispatch(resetWallet());
    dispatch(resetNetwork());
  }

  return (
    <Wrapper>
      <PopInStyled isOpen={accountDetailsOpen} setIsOpen={setAccountDetailsOpen}>
        <AccountDetailsModal address={address} />
      </PopInStyled>
      <PopIn isOpen={infoModalOpen} setIsOpen={setInfoModalOpen} showClose={false}>
        <ConnectInfoModal onButtonClick={() => setInfoModalOpen(false)} address={address} />
      </PopIn>
      <InternalWrapper>
        <Left>
          <AccountDetails
            arrowVisible={false}
            closeTrigger="click"
            offSet={[60, 0]}
            content={
              <AccountDetailsContent>
                <AccountDetailButton
                  backgroundTransparent
                  iconLeft="qrcode"
                  onClick={() => setAccountDetailsOpen(true)}
                >
                  Account details
                </AccountDetailButton>
                <AccountDetailButton
                  backgroundTransparent
                  iconLeft="external-link"
                  onClick={() => openExplorerTab(address, 'contract', chainId)}
                >
                  View on explorer
                </AccountDetailButton>
              </AccountDetailsContent>
            }
          >
            <AccountImageStyled address={address} connected={wallet.connected} />
          </AccountDetails>
        </Left>
        <AssetQuantity
          currencyValue={getHumanReadableAmount(wallet.tokenBalance)}
          // currencyValue={balance}
          currency="AVL"
          size="big"
          centered
        />
        <Right>
          <Menu
            as="div"
            style={{ display: 'inline-block', position: 'relative', textAlign: 'left' }}
          >
            <Menu.Button
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'transparent'
              }}
            >
              <svg
                width="38"
                height="35"
                viewBox="0 0 44 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.125 34.125C26.125 35.1693 25.6904 36.1708 24.9168 36.9092C24.1432 37.6477 23.094 38.0625 22 38.0625C20.906 38.0625 19.8568 37.6477 19.0832 36.9092C18.3096 36.1708 17.875 35.1693 17.875 34.125C17.875 33.0807 18.3096 32.0792 19.0832 31.3408C19.8568 30.6023 20.906 30.1875 22 30.1875C23.094 30.1875 24.1432 30.6023 24.9168 31.3408C25.6904 32.0792 26.125 33.0807 26.125 34.125ZM26.125 21C26.125 22.0443 25.6904 23.0458 24.9168 23.7842C24.1432 24.5227 23.094 24.9375 22 24.9375C20.906 24.9375 19.8568 24.5227 19.0832 23.7842C18.3096 23.0458 17.875 22.0443 17.875 21C17.875 19.9557 18.3096 18.9542 19.0832 18.2158C19.8568 17.4773 20.906 17.0625 22 17.0625C23.094 17.0625 24.1432 17.4773 24.9168 18.2158C25.6904 18.9542 26.125 19.9557 26.125 21ZM26.125 7.875C26.125 8.91929 25.6904 9.92081 24.9168 10.6592C24.1432 11.3977 23.094 11.8125 22 11.8125C20.906 11.8125 19.8568 11.3977 19.0832 10.6592C18.3096 9.92081 17.875 8.91929 17.875 7.875C17.875 6.83071 18.3096 5.82919 19.0832 5.09077C19.8568 4.35234 20.906 3.9375 22 3.9375C23.094 3.9375 24.1432 4.35234 24.9168 5.09077C25.6904 5.82919 26.125 6.83071 26.125 7.875Z"
                  fill="white"
                />
              </svg>
            </Menu.Button>
            <MenuItems>
              <MenuSection>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={disconnect}
                      style={{
                        padding: '8px 0px',
                        background: active ? theme.palette.grey.grey4 : theme.palette.grey.white,
                        cursor: 'pointer'
                      }}
                    >
                      <FontAwesomeIcon
                        icon="sign-out"
                        color={theme.palette.grey.grey1}
                        style={{ fontSize: '12px', lineHeight: '12px', padding: '0px 10px' }}
                      />
                      <MenuItemText>Disconnect</MenuItemText>
                    </div>
                  )}
                </Menu.Item>
              </MenuSection>
            </MenuItems>
          </Menu>
        </Right>
      </InternalWrapper>
      <RowDiv>
        <InfoIcon onClick={() => setInfoModalOpen(true)}>i</InfoIcon>
        <AccountAddress address={address} />
      </RowDiv>
      <Buttons>
        <HeaderButton onClick={() => setReceiveOpen(true)}>Receive</HeaderButton>
        <SendButton onClick={() => handleSendClick()}>Send</SendButton>
      </Buttons>
      <PopIn isOpen={receiveOpen} setIsOpen={setReceiveOpen}>
        <ReceiveModal address={address} />
      </PopIn>
      <PopIn isOpen={sendOpen} setIsOpen={setSendOpen}>
        <SendModal closeModal={() => setSendOpen(false)} />
      </PopIn>
    </Wrapper>
  );
};
