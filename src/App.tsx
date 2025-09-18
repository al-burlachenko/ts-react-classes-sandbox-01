import { Component, type ErrorInfo } from 'react';
import Container from './components/Container/Constainer';
import ContactsForm from './components/ContactsForm/ContactsForm';
import ContactsList from './components/ContactsList/ContactsList';
import ContactFilter from './components/ContactFilter/ContactFilter';

import type { stateType } from '@/utils/types';
import { parse } from 'path';

export default class App extends Component<
  { contacts: stateType[]; filter: string },
  {}
> {
  state = {
    contacts: [
      { name: 'nomad1', number: '123123', key: '123' },
      { name: 'nomad2', number: '231233', key: '2123' },
    ],
    filter: '',
  };

  componentDidMount(): void {
    const storage: stateType = JSON.parse(localStorage.getItem('contacts'));
    console.log('component mounted', storage);
    if (storage) this.setState({ contacts: storage });
  }

  componentDidUpdate(
    prevProps: Readonly<{ contacts: stateType[]; filter: string }>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log('component updated', prevState);
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;
    if (prevContacts !== nextContacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log('local storage write in `componentDidUpdate`');
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('component catched error', this.state);
  }

  handleSubmit = (newContact: stateType): void => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert('name already existes in the list');
    } else this.setState({ contacts: [...this.state.contacts, newContact] });
  };

  filterChange = (filterValue: string) => {
    this.setState({ filter: filterValue });
    localStorage.clear();
  };

  filterContacts = (filterValue: string): stateType[] => {
    if (filterValue.trim()) {
      return this.state.contacts.filter(item => {
        const normalizeName = item.name.toLowerCase().trim();
        const normalizeFilter = filterValue.toLowerCase().trim();
        return normalizeName.includes(normalizeFilter);
      });
    }
    return this.state.contacts;
  };

  handleDelete = (key: string): void => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.key !== key),
    });
  };

  render() {
    return (
      <Container>
        <ContactsForm onSubmit={this.handleSubmit} />
        <ContactsList
          contacts={this.filterContacts(this.state.filter)}
          onDelete={this.handleDelete}
        />
        <ContactFilter onChange={this.filterChange} />
      </Container>
    );
  }
}
