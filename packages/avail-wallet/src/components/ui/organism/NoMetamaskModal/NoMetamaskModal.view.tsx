import {
  ConnectButton,
  DescriptionCentered,
  MetamaskIcon,
  Title,
  Wrapper
} from './NoMetamaskModal.style';

export const NoMetamaskModalView = () => {
  return (
    <Wrapper>
      <Title>You don't have the MetaMask extension</Title>
      <DescriptionCentered>
        You need to install MetaMask extension in order to use the Avail Snap.
        <br />
        <br />
      </DescriptionCentered>
      <a href="https://metamask.io/" target="_blank" rel="noreferrer noopener">
        <ConnectButton customIconLeft={<MetamaskIcon />} onClick={() => {}}>
          Download MetaMask
        </ConnectButton>
      </a>
    </Wrapper>
  );
};
