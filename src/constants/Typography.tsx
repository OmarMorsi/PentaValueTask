import React from 'react';
import styled from 'styled-components/native';
import {perfectSize} from './commonFunctions';
import colors from '../styles/colors';
import {TextStyle} from 'react-native';

type TypographyProps = {
  text?: string;
  size?: number;
  maxChar?: number;
  noLimit?: boolean;
  isRequired?: boolean;
} & TextStyle;

const Typography: React.FC<TypographyProps> = ({
  text,
  color = colors.black,
  size = 16,
  noLimit,
  maxChar = 50,
  ...props
}: TypographyProps) => {
  return (
    <Text size={perfectSize(size)} color={color} style={{...props}}>
      {noLimit
        ? text
        : text !== undefined
        ? text?.length >= maxChar
          ? `${text.slice(0, maxChar)}...`
          : text
        : null}
    </Text>
  );
};

export default Typography;

type TextProps = {
  color?: string;
  size: number;
  textAlign?: string;
  [anyOtherProp: string]: any;
};

const Text = styled.Text<TextProps>`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: left;
  ${({textAlign}) => textAlign && `text-align: ${textAlign}`}
`;
