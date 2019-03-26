import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ListItem extends Component {
  render() {
    return (
      <li className="list-item">
        <p>{this.props.value}</p>
        <button>Edit</button>
        <button>Delete</button>
      </li>
    );
  }
}

class List extends Component {
  render() {
    return (
      <div className="List">
        <h2>List Header</h2>
        <ul className='list-container'>
          <ListItem
            value="List Value"
          />
        </ul>
      </div>
    );
  }
}

class ToDoApp extends Component {
  render() {
    return (
      <div className="App">
        <List/>
      </div>
    );
  }
}

export default ToDoApp;
