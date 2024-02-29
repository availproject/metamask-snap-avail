import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  min-height: 780px;

  @media (max-height: 968px) {
    max-height: 780px;
  }

  max-height: 79vh;
`;

export const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.palette.grey.grey6};
`;

export const NoTransactions = styled.p`
  ${(props) => props.theme.typography.p1};
  text-align: center;
  color: ${(props) => props.theme.palette.grey.white};
`;
