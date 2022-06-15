import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonElement } from './style';

type ButtonType = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonType> = ({ children, ...pros }) => {
  return <ButtonElement {...pros}>{children}</ButtonElement>;
};
