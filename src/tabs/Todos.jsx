import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  }

  handleFormSubmit = (text) => {
    const toDo = {
      id: nanoid(),
      text: text,
    }
    this.setState(prevState => ({ todos: [...prevState.todos, toDo] }))
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
              counter={index + 1} />
        </GridItem>)
      })}</Grid>
    </>   
    )
  }
}
