import { InfoIcon } from '../Header.style';

import {
  DeprecateBannerContainer,
  BannerContent,
  StyledInfoIcon,
  BannerText
} from './DeprecateBanner.style';

const DeprecateBannerView = () => {
  return (
    <DeprecateBannerContainer>
      <BannerContent>
        <StyledInfoIcon as={InfoIcon} />
        <BannerText>
          Heads up! The Avail Snap might not work as intended at the moment - we&apos;re working on
          fixing this.
        </BannerText>
      </BannerContent>
    </DeprecateBannerContainer>
  );
};

export default DeprecateBannerView;
