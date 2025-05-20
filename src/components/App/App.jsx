import React from 'react';
import styles from "./App.module.css"; 
import Options from "../Options/Options";

function App() {

  return (
    <>
      <div className={styles['description']}>
        <h1 className={styles['description-title']}>Sip Happens Café</h1>
        <p className={styles['description-text']}>Please leave your feedback about our service by selecting one of the options below.</p>
      </div>
      <div>
        <Options/>
      </div>
      <div></div>
    </>
  )
}

export default App
