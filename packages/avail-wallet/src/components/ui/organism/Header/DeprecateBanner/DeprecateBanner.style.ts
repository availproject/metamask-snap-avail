import styled from 'styled-components';

export const DeprecateBannerContainer = styled.div`
  width: 100%;
  top: 0;
  z-index: 50 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BannerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 2rem;
  font-size: 0.875rem;
  font-weight: 450;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: #1d2a39;
`;

export const StyledInfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  color: rgba(255, 255, 255, 0.6);

  @media (min-width: 768px) {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

export const BannerText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;

  @media (max-width: 767px) {
    text-align: left;
  }
`;
