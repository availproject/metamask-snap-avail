import logo from 'assets/images/avail-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLAttributes } from 'react';
import { Menu } from '@headlessui/react';
import { theme } from 'theme/default';
import { Radio, Skeleton } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  setWalletConnection,
  setForceReconnect,
  resetWallet,
  clearAccounts
} from 'slices/walletSlice';
import { resetNetwork, setActiveNetwork } from 'slices/networkSlice';
import { useAvailSnap } from 'services/metamask';
import {
  Left,
  Right,
  NetworkPill,
  MenuIcon,
  Badge,
  MenuDivider,
  MenuItems,
  Wrapper,
  MenuSection,
  Bold,
  MenuItemText,
  NetworkMenuItem
} from './Menu.style';

interface IProps extends HTMLAttributes<HTMLElement> {
  connected: boolean;
}

export const MenuView = ({ connected, ...otherProps }: IProps) => {
  const { switchNetwork } = useAvailSnap();
  const networks = useAppSelector((state) => state.networks);
  const dispatch = useAppDispatch();

  const changeNetwork = async (network: number, chainId: string) => {
    console.log('data is: ', network, chainId);
    let result = false;
    if (networks.activeNetwork !== network) {
      result = await switchNetwork(network, chainId);
    }
    if (result) {
      dispatch(clearAccounts());
      dispatch(setActiveNetwork(network));
    }
  };

  return (
    <Wrapper {...otherProps}>
      <Left>
        <img height="40px" src={logo} alt="logo" />
      </Left>
      <Right>
        <Menu as="div" style={{ display: 'inline-block', position: 'relative', textAlign: 'left' }}>
          <Menu.Button
            as="div"
            style={{
              cursor: 'pointer',
              border: 'none',
              background: 'transparent'
            }}
          >
            <NetworkPill iconRight="angle-down" backgroundTransparent>
              {networks.items[networks.activeNetwork] ? (
                networks.items[networks.activeNetwork].displayName
              ) : (
                <Skeleton variant="text" width={100} height={16} />
              )}
            </NetworkPill>
          </Menu.Button>
          <MenuItems>
            <MenuSection>
              <Menu.Item disabled>
                <div style={{ padding: '8px 0px 0px 8px' }}>
                  <Bold>Network</Bold>
                </div>
              </Menu.Item>
            </MenuSection>
            <MenuSection>
              {networks.items.map((network: any, index: any) => (
                <Menu.Item key={network.chainId + '_' + index}>
                  <NetworkMenuItem onClick={() => changeNetwork(index, network.chainId)}>
                    <Radio
                      checked={Number(networks.activeNetwork) === index}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': network.displayName }}
                      sx={{
                        color: theme.palette.grey.grey1,
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main
                        }
                      }}
                    />
                    <MenuItemText>{network.displayName}</MenuItemText>
                  </NetworkMenuItem>
                </Menu.Item>
              ))}
            </MenuSection>
          </MenuItems>
        </Menu>
      </Right>
    </Wrapper>
  );
};
