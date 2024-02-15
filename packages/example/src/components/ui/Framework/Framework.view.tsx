import { ReactNode, useState } from 'react';
import { Footer } from 'components/ui/organism/Footer';
import { Banner, CloseIcon, ColMiddle, Content, MenuStyled, Wrapper } from './Framework.style';

interface Props {
  connected: boolean;
  children?: ReactNode;
}

export const FrameworkView = ({ connected, children }: Props) => {
  return (
    <Wrapper>
      <ColMiddle>
        <MenuStyled connected={connected} />
        <Content>{children}</Content>
        {/* <Footer /> */}
      </ColMiddle>
    </Wrapper>
  );
};
