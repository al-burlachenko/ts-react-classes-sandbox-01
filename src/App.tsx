import { Component } from 'react';
import Container from './components/Container/Constainer';
import ContactsForm from './components/ContactsForm/ContactsForm';
import ContactsList from './components/ContactsList/ContactsList';
import ContactFilter from './components/ContactFilter/ContactFilter';

import type { stateType } from '@/utils/types';

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

  handleSubmit = (newContact: stateType): void => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      alert('name already existes in the list');
    } else this.setState({ contacts: [...this.state.contacts, newContact] });
  };

  filterChange = (filterValue: string) => {
    this.setState({ filter: filterValue });
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
