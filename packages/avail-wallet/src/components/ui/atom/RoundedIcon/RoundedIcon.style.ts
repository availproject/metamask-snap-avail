import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1.5px solid ${(props) => props.theme.palette.grey.grey5};
  border-radius: 80px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  justify-content: center;
  color: ${(props) => props.theme.palette.grey.grey5};
  background-color: ${(props) => props.theme.palette.grey.white};
  align-items: center;
  display: flex;
`;
