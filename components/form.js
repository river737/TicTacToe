import styles from '../styles/Home.module.css'
import React, { createContext, useState, useEffect } from 'react';

export const nameContext = createContext();

export default class Form extends React.Component {
  state = {
      name: '',
      error: false,
      click: 0
    }

  addingname = (thisname) => {
    this.state.name = thisname;
  }

  submit = (thisname) => {
    if(thisname !== '') {
      this.state.error = false;
      this.state.click++;
    } else {
      this.state.error = true;
      this.state.click++;
    }
    this.forceUpdate();
  }

  componentDidUpdate() {
    if(this.state.name !== '' && this.state.click > 0) {
      this.props.onPlayer(this.state.name)
      const x = document.querySelector(`.${styles.wrapper}`);
      x.style.zIndex="-2";
      x.style.opacity="0";
    }
  }

  render() {
    const thiserror = this.state.error;
    return (
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <h1>One more step...</h1>
          <input type="text" className={styles.input} onChange={(e) => this.addingname(e.target.value)} placeholder="Enter a name" />
          <button className={styles.button} onClick={() => this.submit(this.state.name)}>Submit</button>
          {thiserror && <h3>Error! Name cannot be empty!</h3>}
        </div>
      </div>
    )
  }
}
