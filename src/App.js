import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function EditableListItem(props) {
  return (
    <li className='list-item'>
      <input defaultValue={props.value} onChange={e => props.onEditText(props.id, e.target.value)}/>
      <button onClick={() => props.onClickSave(props.id)}>Save</button>
    </li>
  );
}

function UneditableListItem(props) {
  return (
    <li className='list-item' id={props.id}>
      <p>{props.value}</p>
      <button>Complete</button>
      <button onClick={() => props.onClickEdit(props.id)}>Edit</button>
    </li>
  );
}

class ListItem extends Component {
  render() {
    let edit = this.props.edit;
    let listItem = <UneditableListItem value={this.props.value} id={this.props.id} onClickEdit={id => this.props.onClickEdit(id)} />;

    if(edit) {
      listItem = <EditableListItem value={this.props.value} id={this.props.id} onClickSave={id => this.props.onClickSave(id)} onEditText={(id, value) => this.props.onEditText(id, value)} />;
    }

    return (
      <div>
        {listItem}
      </div>
    );
  }
}

class List extends Component {
  render() {
    let items = this.props.items.map((item, key) =>
      <ListItem 
        value={item.value}
        key={item.id}
        id={item.id}
        edit={item.edit}
        onClickEdit={id => this.props.onClickEdit(id)}
        onClickSave={id => this.props.onClickSave(id)}
        onEditText={(id, value) => this.props.onEditText(id, value)}
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
      value: this.state.valueToAdd,
      edit: false
    })
    this.setState({
      itemsToDo: items,
      numberOfItems: numberOfItems,
      valueToAdd: ""
    });
  }

  handleAddItemText(value) {
    this.setState({
      valueToAdd: value
    });
  }

  handleEditItemText(itemId, value) {
    let items = this.state.itemsToDo.slice();
    let itemNumber = searchForItem(items, itemId);

    items[itemNumber].value = value;

    this.setState({
      itemsToDo: items
    });
  }

  handleSaveListItem(itemId) {
    let items = this.state.itemsToDo.slice();
    let itemNumber = searchForItem(items, itemId);

    items[itemNumber].edit = false;

    this.setState({
      itemsToDo: items
    });
  }

  handleEditListItem(itemId) {
    let items = this.state.itemsToDo.slice();
    let itemNumber = searchForItem(items, itemId);

    items[itemNumber].edit = true;

    this.setState({
      itemsToDo: items
    });
  }

  render() {
    return (
      <div className='ToDoApp'>
        <h1>To Do App</h1>
        <AddItem 
          onClick={() => this.handleClickAddItem()}
          onChange={value => this.handleAddItemText(value)}
          value={this.state.valueToAdd}
        />
        <List 
          items={this.state.itemsToDo}
          header="To Do"
          onClickEdit={id => this.handleEditListItem(id)}
          onClickSave={id => this.handleSaveListItem(id)}
          onEditText={(id, value) => this.handleEditItemText(id, value)}
        />
      </div>
    );
  }
}

export default ToDoApp;

function searchForItem(itemList, itemId) {
  let item;
  for(let i = 0; i < itemList.length; i++) {
    item = itemList[i];
    if(item.id === itemId) {
      return i;
    }
  }
}
