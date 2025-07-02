import 'react-dropdown/style.css';

import { HelperText } from 'components/ui/atom/HelperText';
import { Label } from 'components/ui/atom/Label';
import { Group, Option, ReactDropdownProps } from 'react-dropdown';

import { DropdownStyled, Wrapper } from './DropDown.style';

interface Props extends ReactDropdownProps {
  error?: boolean;
  options: (string | Group | Option)[];
  helperText?: string;
  label?: string;
  value?: string | Option;
}

export const DropDownView = ({
  disabled,
  error,
  options,
  helperText,
  label,
  value,
  ...otherProps
}: Props) => {
  return (
    <Wrapper>
      <Label error={error}>{label}</Label>
      <DropdownStyled
        error={error}
        disabled={disabled}
        options={options}
        value={value}
        placeholder="Select an option"
        {...otherProps}
      />

      {helperText && <HelperText>{helperText}</HelperText>}
    </Wrapper>
  );
};
