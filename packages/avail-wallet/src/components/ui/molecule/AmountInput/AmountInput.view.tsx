import { KeyboardEvent, useEffect, InputHTMLAttributes, useRef, useState } from 'react';
import { Erc20TokenBalance } from '@types';
import { ethers } from 'ethers';
import { getAmountPrice, isSpecialInputKey } from 'utils/utils';
import { HelperText } from '../../atom/HelperText';
import { Label } from '../../atom/Label';
import {
  IconRight,
  Input,
  InputContainer,
  Left,
  MaxButton,
  RowWrapper,
  USDDiv,
  Wrapper
} from './AmountInput.style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  label?: string;
  decimalsMax?: number;
  asset: Erc20TokenBalance;
  onChangeCustom?: (value: string) => void;
}

export const AmountInputView = ({
  disabled,
  error,
  helperText,
  label,
  decimalsMax = 18,
  asset,
  onChangeCustom,
  ...otherProps
}: Props) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [usdMode, setUsdMode] = useState(false);

  const resizeInput = () => {
    if (inputRef.current !== null)
      inputRef.current.style.width = inputRef.current.value.length * 8 + 6 + 'px';
  };

  const triggerOnChange = () => {
    //If we are in USD mode we sent the eth amount as the value
    const valueToSend = inputRef.current?.value || '';
    if (onChangeCustom) {
      onChangeCustom(valueToSend);
    }
  };

  const handleOnKeyUp = () => {
    //Resize the input depending on content
    resizeInput();
    inputRef.current;
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //Only accept numeric and decimals
    if (
      (!/[0-9]|\./.test(event.key) ||
        (event.key === '.' && inputRef.current && inputRef.current.value.includes('.'))) &&
      !isSpecialInputKey(event)
    ) {
      event.preventDefault();
      return;
    }

    //Check decimals
    if (inputRef.current && inputRef.current.value.includes('.')) {
      const decimalIndex = inputRef.current.value.indexOf('.');
      const decimals = inputRef.current.value.substring(decimalIndex);
      if (decimals.length >= decimalsMax && !isSpecialInputKey(event)) {
        event.preventDefault();
        return;
      }
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleMaxClick = () => {
    if (inputRef.current) {
      const amountStr = ethers.utils.formatUnits(asset.amount, asset.decimals).toString();
      inputRef.current.value = amountStr;
      resizeInput();
      triggerOnChange();
    }
  };

  return (
    <Wrapper>
      <RowWrapper>
        <Label error={error}>{label}</Label>
        <MaxButton onClick={handleMaxClick}>Max</MaxButton>
      </RowWrapper>

      <InputContainer
        error={error}
        disabled={disabled}
        focused={focused}
        onClick={() => handleContainerClick()}
      >
        <Left>
          <Input
            error={error}
            disabled={disabled}
            focused={focused}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={inputRef}
            onKeyUp={() => handleOnKeyUp()}
            onKeyDown={(event: any) => handleOnKeyDown(event)}
            onChange={(event) => triggerOnChange()}
            {...otherProps}
          />
          {asset.symbol}
        </Left>
      </InputContainer>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Wrapper>
  );
};
