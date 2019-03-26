import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class ListItem extends Component {
  render() {
    return (
      <li className='list-item'>
        <p>{this.props.value}</p>
        <button>Complete</button>
        <button>Edit</button>
      </li>
    );
  }
}

class List extends Component {
  render() {
    let items = this.props.items.map((item, key) =>
      <ListItem 
        value={item.value}
        key={item.id}
      />
    );

    return (
      <div className='List'>
        <h2>{this.props.header}</h2>
        <ul className='list-container'>
          {items}
        </ul>
      </div>
    );
  }
}

class AddItem extends Component {
  render() {
    return (
      <div className='AddItem'>
        <input onChange={e => this.props.onChange(e.target.value)} type='text' placeholder='Item' value={this.props.value} />
        <button onClick={() => this.props.onClick()}>Add Item</button>
      </div>
    );
  }
}

class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToDo: [
        
      ],
      numberOfItems: 0,
      valueToAdd: ""
    };
  }

  handleClickAddItem() {
    let items = this.state.itemsToDo.slice();
    let numberOfItems = this.state.numberOfItems+1;
    items.push({
      id: 'list-item-'+numberOfItems,
      value: this.state.valueToAdd
    })
    this.setState({
      itemsToDo: items,
      numberOfItems: numberOfItems,
      valueToAdd: ""
    });
  }

  handleChangeItemText(value) {
    this.setState({
      valueToAdd: value
    })
  }

  editListItem() {

  }

  render() {
    return (
      <div className='ToDoApp'>
        <h1>To Do App</h1>
        <AddItem 
          onClick={() => this.handleClickAddItem()}
          onChange={value => this.handleChangeItemText(value)}
          value={this.state.valueToAdd}
        />
        <List 
          items={this.state.itemsToDo}
          header="To Do"
        />
      </div>
    );
  }
}

export default ToDoApp;
