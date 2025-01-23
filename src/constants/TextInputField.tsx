import React from 'react';
import styled from 'styled-components/native';
import colors from '../styles/colors';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  style?: object;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  autoCapitalize = 'none',
  secureTextEntry = false,
  style,
}) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={colors.darkGrey}
      style={style}
    />
  );
};

export default TextInputField;

const StyledTextInput = styled.TextInput`
  margin-vertical: 4px;
  height: 50px;
  border-width: 1px;
  border-radius: 4px;
  padding: 10px;
  background-color: ${colors.white};
  border-color: ${colors.grey};
  margin-horizontal: 20px;
`;
