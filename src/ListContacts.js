import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { query } = this.state
    const { contacts, onDeleteContact } = this.props

    const contactsToShow =
      query === ''
        ? contacts
        : contacts.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
          )

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search Contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <a
            href="#create"
            onClick={this.props.onNavigate}
            className="add-contact"
          />
        </div>
        <ol className="contact-list">
          {contactsToShow.length !== contacts.length && (
            <div className="showing-contacts">
              <span>
                Now showing {contactsToShow.length} of {contacts.length}
              </span>
              <button onClick={this.clearQuery}>Show all</button>
            </div>
          )}
          {contactsToShow.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
