import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isEmpty: false,
    showBtn: false,
    error: null,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (photos.length === 0) {
          this.setState({
            isEmpty: true,
          });
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          showBtn: page < Math.ceil(total_results / 15),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = msg => {
    const { query } = this.state;

    if (query === msg) {
      return;
    }

    this.setState({
      query: msg,
      page: 1,
      photos: [],
      isEmpty: false,
      showBtn: false,
      error: null,
      isLoading: false,
    });
  };

  render() {
    const { photos, isEmpty } = this.state;
    console.log(photos);

    return (
      <>
        <SearchForm submit={this.handleFormSubmit} />

        <Grid>
          {photos.map(({ id, alt, src: { large }, avg_color }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>

        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
