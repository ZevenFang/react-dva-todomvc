import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TodoItem from '../components/TodoItem';

class IndexPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      filter: 'All'
    }
  }

  addTask = (v) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todo/add',
      row: {
        text: v,
        completed: false
      }
    })
  };

  delTask = (id) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todo/del',
      id
    })
  };

  updTask = (id, text) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todo/upd',
      id, text
    });
  };

  checkTask = (id) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todo/check', id
    })
  };

  clearCompleted = () => {
    let {dispatch, todo} = this.props;
    let id = todo.data.filter(v => (v.completed)).map(v => (v._id));
    dispatch({
      type: 'todo/del', id
    })
  };

  render(){
    let {data} = this.props.todo;
    let completedTask = data.filter(v=>!v.completed);
    let {filter} = this.state;
    if (filter==='Active')
      data = data.filter(v=>!v.completed);
    else if (filter==='Completed')
      data = data.filter(v=>v.completed);
    return (
      <div>
        <section className="todoapp">
          <Header onSubmit={this.addTask}/>
          {/* This section should be hidden by default and shown when there are todos */}
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
            <ul className="todo-list">
              {/* These are here just to show the structure of the list items */}
              {/* List items should get the class `editing` when editing and `completed` when marked as completed */}
              {data.map((v,k)=>(
                <TodoItem key={k} id={k} todo={v} editTodo={this.updTask} deleteTodo={this.delTask} completeTodo={this.checkTask}/>
              ))}
            </ul>
          </section>
          {/* This footer should hidden by default and shown when there are todos */}
          <footer className="footer">
            {/* This should be `0 items left` by default */}
            <span className="todo-count"><strong>{completedTask.length==0?'No':completedTask.length}</strong> item{completedTask.length>1?'s':''} left</span>
            {/* Remove this if you don't implement routing */}
            <ul className="filters">
              <li onClick={() => this.setState({filter:'All'})}>
                <a className={filter==='All'?'selected':''} href="#">All</a>
              </li>
              <li onClick={() => this.setState({filter:'Active'})}>
                <a className={filter==='Active'?'selected':''} href="#">Active</a>
              </li>
              <li onClick={() => this.setState({filter:'Completed'})}>
                <a className={filter==='Completed'?'selected':''} href="#">Completed</a>
              </li>
            </ul>
            {/* Hidden if no completed items are left ↓ */}
            <button className="clear-completed" onClick={this.clearCompleted}>
              Clear completed
            </button>
          </footer>
        </section>
        <Footer/>
      </div>
    );
  }

}

class Header extends Component {

  handleKeyPress = (e) => {
    if (e.key==='Enter' && e.target.value.length > 0){
      this.props.onSubmit(e.target.value);
      e.target.value = '';
    }
  };

  render(){
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onKeyPress={this.handleKeyPress}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus />
      </header>
    )
  }
}

class Footer extends Component {
  render(){
    return (
      <footer className="info">
        <p>
          Double-click to edit a todo
        </p>
        {/* Remove the below line ↓ */}
        <p>
          Template by <a href="http://sindresorhus.com">
          Sindre Sorhus
        </a>
        </p>
        {/* Change this out with your name and url ↓ */}
        <p>
          Created by <a href="https://github.com/zevenfang">Zeven Fang</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    )
  }
}

IndexPage.propTypes = {
};

export default connect(({todo})=>({todo}))(IndexPage);
