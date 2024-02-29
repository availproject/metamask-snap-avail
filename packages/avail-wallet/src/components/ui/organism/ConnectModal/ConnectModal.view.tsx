import { useAvailSnap } from 'services/metamask';
import { SNAPS_DOC_URL } from 'utils/constants';

import {
  ConnectButton,
  Description,
  DescriptionCentered,
  MetamaskIcon,
  ReadMore,
  AvailLogo,
  Title,
  WhatIsSnap,
  WhatIsSnapDiv,
  Wrapper
} from './ConnectModal.style';

export const ConnectModalView = () => {
  const { connectToSnap } = useAvailSnap();

  const handleReadMoreClick = () => {
    window.open(SNAPS_DOC_URL, '_blank')?.focus();
  };

  return (
    <Wrapper>
      {/* <AvailLogo /> */}
      <Title>
        Connect to MetaMask<br></br> Avail Snap
      </Title>
      <DescriptionCentered>
        If you do not have the Avail snap installed you will be prompted to install it.
      </DescriptionCentered>
      <WhatIsSnapDiv>
        <WhatIsSnap>What is a snap?</WhatIsSnap>
        <Description>
          Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows
          MetaMask to be compatible with Avail and manage your keys.
        </Description>
        <ReadMore onClick={handleReadMoreClick}>Read more</ReadMore>
      </WhatIsSnapDiv>
      <ConnectButton customIconLeft={<MetamaskIcon />} onClick={connectToSnap}>
        Connect with MetaMask
      </ConnectButton>
    </Wrapper>
  );
};
