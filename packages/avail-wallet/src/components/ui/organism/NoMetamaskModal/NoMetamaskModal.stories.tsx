import { Meta } from '@storybook/react';
import { PopIn } from 'components/ui/molecule/PopIn';
import { useState } from 'react';

import { NoMetamaskModalView } from './NoMetamaskModal.view';

export default {
  title: 'Organism/NoMetamaskModal',
  component: NoMetamaskModalView
} as Meta;

export const ContentOnly = () => <NoMetamaskModalView />;

export const WithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      <PopIn isOpen={isOpen} setIsOpen={setIsOpen} showClose={false}>
        <NoMetamaskModalView></NoMetamaskModalView>
      </PopIn>
    </>
  );
};
