import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = { query: '' };

  handleChange = e => {
    const normalizedQuery = e.target.value.toLowerCase().trim();

    this.setState({ query: normalizedQuery });
  };

  handleFormSubmit = e => {
    const { query } = this.state;

    e.preventDefault();

    if (query) {
      this.props.submit(query);
    }
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchFormStyled onSubmit={this.handleFormSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          value={query}
          required
          autoFocus
          onChange={this.handleChange}
        />
      </SearchFormStyled>
    );
  }
}
