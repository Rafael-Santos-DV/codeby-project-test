import React, { ReactNode } from 'react';
import { Container } from './style';

type CardLinkType = {
  title: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CarLink: React.FC<CardLinkType> = ({
  children,
  title,
  className,
  onClick,
}) => {
  return (
    <Container className={className} onClick={onClick}>
      <span data-type={title}>{title}</span>
      <div className="links">{children}</div>
    </Container>
  );
};
