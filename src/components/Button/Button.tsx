import { Component, type ReactNode } from 'react';
import css from './Button.module.css';

const Button = ({
  children,
  onClick,
  ...allyProps
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <button className={css.button} onClick={onClick} {...allyProps}>
      {children}
    </button>
  );
};

export default Button;
