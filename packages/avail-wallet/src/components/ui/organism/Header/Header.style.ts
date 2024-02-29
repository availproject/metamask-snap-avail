import styled from 'styled-components';
import { AccountImage } from 'components/ui/atom/AccountImage';
import { Button } from 'components/ui/atom/Button';
import { RoundedIcon } from 'components/ui/atom/RoundedIcon';
import { PopIn } from 'components/ui/molecule/PopIn';
import { PopperTooltip } from 'components/ui/molecule/PopperTooltip';
import { Menu } from '@headlessui/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.grey.grey6};
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.shadow.dividerBottom.boxShadow};
  padding-top: ${(props) => props.theme.spacing.tiny2};
`;

export const InternalWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  a {
    all: unset;
  }
`;

export const Left = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    transform: translateX(-3px);
  }
`;

export const Right = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding-right: ${(props) => props.theme.spacing.base};
`;

export const MenuItems = styled(Menu.Items)`
  position: absolute;
  right: 0;
  background: #ffffff;
  box-shadow: 0px 14px 24px -6px rgba(106, 115, 125, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  gap: 8px;
  width: 135px;
  margin-right: 18px;
`;

export const MenuSection = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
`;

export const MenuItemText = styled.span`
  ${(props) => props.theme.typography.p2};
`;

export const MenuDivider = styled(Menu.Items)`
  width: 280px;
  height: 1px;
  background: #d4d4e1;
`;

export const MenuIcon = styled(RoundedIcon).attrs(() => ({}))`
  height: 40px;
  width: 40px;
  position: relative;
  color: ${(props) => props.theme.palette.grey.grey1};
  // border-radius: 80px;
  // border: 1px solid ${(props) => props.theme.palette.grey.white};
  // &:hover {
  //   background-color: ${(props) => props.theme.palette.grey.white};
  // }
`;

export const Badge = styled.div.attrs(() => ({}))`
  box-sizing: border-box;
  position: absolute;
  width: 12px;
  height: 12px;
  left: 30px;
  top: 0px;
  border-radius: 50%;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.large};
  margin-top: ${(props) => props.theme.spacing.tiny2};
`;

export const InfoIcon = styled(RoundedIcon)`
  cursor: pointer;
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.spacing.base};
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

export const HeaderButton = styled(Button)`
  margin-right: ${(props) => props.theme.spacing.base};
`;

export const SendButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.grey.white};
  color: ${(props) => props.theme.palette.grey.grey5};
`;

export const AccountDetailButton = styled(Button).attrs((props) => ({
  backgroundTransparent: true,
  fontSize: props.theme.typography.c1.fontSize,
  textStyle: {
    color: props.theme.palette.grey.black,
    fontWeight: props.theme.typography.c1.fontWeight
    // textTransform: 'initial'
  }
}))`
  text-transform: 'initial';
  padding: 0px;
  border-radius: 0px;
  :hover {
    background-color: ${(props) => props.theme.palette.grey.grey4};
  }
`;

export const AccountImageStyled = styled(AccountImage)`
  margin-left: ${(props) => props.theme.spacing.base};
  // margin-top: ${(props) => props.theme.spacing.small};
  cursor: pointer;
`;

export const AccountDetails = styled(PopperTooltip)``;

export const AccountDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

export const PopInStyled = styled(PopIn)`
  background-color: transparent;
  .modal-close-button {
    transform: translateY(45px);
  }
`;
