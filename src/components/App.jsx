import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { VertFlexSection, OneLine } from './App.styled';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactFormSubmit = ({ contact }) => {
    const { name, number } = contact;

    setContacts(contacts => {
      return [...contacts, { id: nanoid(), name, number }];
    });
  };

  const filterContacts = () =>
    contacts.filter(c => c.name.toLowerCase().includes(filter));

  const handleFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = id => {
    const filtered = contacts.filter(c => c.id !== id);
    setContacts(filtered);
  };

  console.log(contacts);
  const nameList = contacts.map(({ name }) => name);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
        backgroundColor: 'var(--back-color-2)',
      }}
    >
      <VertFlexSection>
        <OneLine>
          <h2>Phonebook</h2>
        </OneLine>
        <ContactForm onSubmit={handleContactFormSubmit} nameList={nameList} />
        <h3>Contacts</h3>
        <Filter onChange={handleFilterChange} />
        <ContactList contacts={filterContacts()} onDelete={deleteContact} />
      </VertFlexSection>
    </div>
  );
};
