import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { VertFlexSection, OneLine } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  contactRemove,
  filterSet,
  getContacts,
  getFilter,
} from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filterContacts = () =>
    contacts.filter(c => c.name.toLowerCase().includes(filter));

  const handleFilterChange = e => {
    dispatch(filterSet(e.target.value.toLowerCase()));
  };

  const deleteContact = id => {
    dispatch(contactRemove({ id }));
  };

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
        <ContactForm />
        <h3>Contacts</h3>
        <Filter onChange={handleFilterChange} />
        <ContactList contacts={filterContacts()} onDelete={deleteContact} />
      </VertFlexSection>
    </div>
  );
};
