import React, { Component } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import css from './Searchbar.module.css';
import Button from '@/components/Button/Button';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.inputValue.trim())
      return this.props.onSubmit(this.state.inputValue);
    return alert('fill input');
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <Button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>
              <FaMagnifyingGlass />
            </span>
          </Button>

          <input
            className={css['SearchForm-input']}
            id="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}
