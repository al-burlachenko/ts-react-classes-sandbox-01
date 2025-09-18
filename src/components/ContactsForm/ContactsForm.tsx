import React, { Component, type ReactEventHandler } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactsForm.module.css';
import Button from '@/components/Button/Button';

import type { stateType } from '@/utils/types';

export default class ContactsForm extends Component<
  {
    onSubmit: (newContact: stateType) => void;
  },
  stateType
> {
  defaultState: stateType = {
    name: '',
    number: '',
    key: nanoid(),
  };

  state = {
    name: '',
    number: '',
    key: nanoid(),
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.name && this.state.number) {
      this.props.onSubmit({ ...this.state, key: nanoid() });
      this.setState(this.defaultState);
    } else alert('fill all fields');
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.currentTarget.name;
    const value: string = e.currentTarget.value;
    this.setState({ [name]: value } as Pick<stateType, keyof stateType>);
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          onChange={this.handleInput}
          value={this.state.name}
          required
        />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          type="tel"
          placeholder="123-45-678"
          // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          name="number"
          id="number"
          autoComplete="off"
          onChange={this.handleInput}
          value={this.state.number}
          required
        />
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}
