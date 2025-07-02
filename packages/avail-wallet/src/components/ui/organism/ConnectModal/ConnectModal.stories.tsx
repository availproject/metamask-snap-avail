import { Meta } from '@storybook/react';
import { PopIn } from 'components/ui/molecule/PopIn';
import { useState } from 'react';

import { ConnectModalView } from './ConnectModal.view';

export default {
  title: 'Organism/ConnectModal',
  component: ConnectModalView
} as Meta;

export const ContentOnly = () => <ConnectModalView />;

export const WithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      <PopIn isOpen={isOpen} setIsOpen={setIsOpen} showClose={false}>
        <ConnectModalView></ConnectModalView>
      </PopIn>
    </>
  );
};
