import { Meta } from '@storybook/react';
import { PopIn } from 'components/ui/molecule/PopIn';
import { useState } from 'react';

import { SendModalView } from './SendModal.view';

export default {
  title: 'Organism/Header/SendModal',
  component: SendModalView
} as Meta;

export const ContentOnly = () => <SendModalView />;

export const WithModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      <PopIn isOpen={isOpen} setIsOpen={setIsOpen}>
        <SendModalView closeModal={() => setIsOpen(false)}></SendModalView>
      </PopIn>
    </>
  );
};
