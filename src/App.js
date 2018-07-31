import React, { Component } from 'react'
import ListContacts from './ListContacts'
import { getAll, remove } from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    getAll().then(contacts => {
      this.setState({ contacts })
    })
  }

  removeContact = contact => {
    remove(contact)
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c => {
        return c.id !== contact.id
      })
    }))
  }

  render() {
    return (
      <div>
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    )
  }
}

export default App
