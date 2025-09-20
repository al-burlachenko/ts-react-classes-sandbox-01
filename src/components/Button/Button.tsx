import type { ButtonHTMLAttributes, FC } from 'react';
import css from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: FC<Props> = ({ children, ...allyProps }) => {
  // console.log(allyProps);
  return (
    <button className={css.Button} {...allyProps}>
      {children}
    </button>
  );
};
export default Button;
