import React, { Component, type ReactNode } from 'react';
import css from './ContactFilter.module.css';

export default class ContactFilter extends Component<
  { onChange: (value: string) => void },
  {}
> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.props.onChange(value);
  };

  render(): ReactNode {
    return (
      <form className={css.form}>
        <label htmlFor="filter" className={css.label}>
          Find contact by name
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          className={css.input}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
