import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";
import { useState } from "react";

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState(false)

  function toggleRead(selectedEmail) {
    const updatedEmails = JSON.parse(JSON.stringify(emails))
    const match = updatedEmails.find(email => email.id === selectedEmail.id)
    match.read = !match.read
    setEmails(updatedEmails)
  }


  function toggleStar(selectedEmail) {
    const updatedEmails = JSON.parse(JSON.stringify(emails))
    const match = updatedEmails.find(email => email.id === selectedEmail.id)
    match.starred = !match.starred

    setEmails(updatedEmails)
  }


  let emailsToShow = emails

  function toggleHideRead() {
    setHideRead(!hideRead)
    
  }


  if (hideRead) {
    emailsToShow = emailsToShow.filter(email => !email.read)
  }


  function toggleStarredEmails () {
    setCurrentTab(!currentTab)
  }


  if (currentTab) {
    emailsToShow = emailsToShow.filter(email => email.starred )
  }


  let starredEmails = 0
  initialEmails.forEach(email => {
    if (email.starred === true) {
      starredEmails += 1
    }
  })


  let unreadEmails = 0
  initialEmails.forEach(email => {
    if (email.read === false) {
      unreadEmails += 1
    }
  })


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
          onClick={() => {
           toggleHideRead()
          }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails}</span>
          </li>
          <li
            className="item"
         onClick={() => {
          toggleStarredEmails ()
         }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                toggleHideRead()
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
        <ul>
          {
            emailsToShow.map(email => (
              <li className={`email ${email.read ? 'read' : 'unread'}`}>
                <input type="checkbox"
                  checked={email.read}
                  onClick={() => {
                    toggleRead(email)
                  }}
                />
                <input type="checkbox"
                  className="star-checkbox"
                  checked={email.starred}
                  onClick={() => {
                    toggleStar(email)
                  }}
                />
                <span>{email.sender}</span>
                <span className="title">{email.title}</span>
              </li>
            ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
