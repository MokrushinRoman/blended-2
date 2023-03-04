import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (!todos) {
      return
    }

    this.setState({todos})
  }
  componentDidUpdate(_,prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos',JSON.stringify(this.state.todos))
      
    }
  }

  handleFormSubmit = (text) => {
    const toDo = {
      id: nanoid(),
      text: text,
    }
    this.setState(prevState => ({ todos: [...prevState.todos, toDo] }))
}

  deleteToDo = id =>{
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => todo.id !== id) }))
    
  }
  render() {
    return (
      <>
      <SearchForm submit={this.handleFormSubmit} />
      <Grid>{this.state.todos.map((todo, index) => {
        return(
        <GridItem key={todo.id}>
            <Todo id={todo.id}
              text={todo.text}
              counter={index + 1}
              deleteToDo={ this.deleteToDo} />
        </GridItem>)
      })}</Grid>
    </>   
    )
  }
}
