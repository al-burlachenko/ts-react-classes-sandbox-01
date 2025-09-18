import { Component, type ReactNode } from 'react';
import css from './Button.module.css';

export default class Button extends Component<
  { children: string; onClick: () => void },
  {}
> {
  render(): ReactNode {
    return (
      <button className={css.button} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
