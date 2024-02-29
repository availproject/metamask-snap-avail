import React, { ReactNode } from 'react';
import { Backdrop } from 'components/ui/atom/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper } from './LoadingBackdrop.style';

interface Props {
  children?: ReactNode;
}

export const LoadingBackdropView = ({ children }: Props) => {
  return (
    <>
      <Backdrop />
      <Wrapper>
        <FontAwesomeIcon icon="spinner" pulse />
        <h3>{children}</h3>
      </Wrapper>
    </>
  );
};
