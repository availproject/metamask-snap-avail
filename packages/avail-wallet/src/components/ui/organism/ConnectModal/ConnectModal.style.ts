import styled from 'styled-components';
import availSrc from 'assets/images/avail-logo.png';
import foxIconSrc from 'assets/images/metamask-fox-icon.svg';
import { Button } from 'components/ui/atom/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.grey.white};
  width: ${(props) => props.theme.modal.base};
  padding: ${(props) => props.theme.spacing.base};
  padding-top: 40px;
  border-radius: 8px;
  align-items: center;
`;

export const AvailLogo = styled.img.attrs(() => ({
  src: availSrc
}))`
  width: 158px;
  height: 32px;
  margin-bottom: 32px;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: ${(props) => props.theme.typography.h3.fontWeight};
  font-size: ${(props) => props.theme.typography.h3.fontSize};
  font-family: ${(props) => props.theme.typography.h3.fontFamily};
  line-height: ${(props) => props.theme.typography.h3.lineHeight};
  margin-bottom: 8px;
`;

export const Description = styled.div`
  font-size: ${(props) => props.theme.typography.p2.fontSize};
  color: ${(props) => props.theme.palette.grey.grey1};
`;

export const DescriptionCentered = styled(Description)`
  text-align: center;
  width: 264px;
`;

export const WhatIsSnapDiv = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
  padding: 24px;
  width: 100%;
  background-color: ${(props) => props.theme.palette.grey.grey4};
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const WhatIsSnap = styled.div`
  font-size: ${(props) => props.theme.typography.h4.fontSize};
  font-weight: ${(props) => props.theme.typography.h4.fontWeight};
  font-family: ${(props) => props.theme.typography.h4.fontFamily};
  margin-bottom: 12px;
`;

export const ReadMore = styled.div`
  margin-top: 12px;
  font-size: ${(props) => props.theme.typography.p2.fontSize};
  font-weight: ${(props) => props.theme.typography.bold.fontWeight};
  font-family: ${(props) => props.theme.typography.bold.fontFamily};
  cursor: pointer;
`;

export const ConnectButton = styled(Button).attrs((props) => ({
  textStyle: {
    fontSize: props.theme.typography.p1.fontSize,
    fontWeight: 900
  },
  upperCaseOnly: false,
  backgroundTransparent: true
}))`
  box-shadow: 0px 14px 24px -6px rgba(106, 115, 125, 0.2);
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const MetamaskIcon = styled.img.attrs(() => ({
  src: foxIconSrc
}))`
  margin-right: 8px;
`;
