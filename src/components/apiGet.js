import React, { Component } from 'react';
import Button from './button';

import apiService from './apiService';
import Pagination from 'react-js-pagination';
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    activePage: 1,
  };

  componentDidMount() {
    this.fecthComments().then(comments =>
      this.setState({
        comments: [comments],
      }),
    );
  }

  fecthComments = () => apiService(this.state.activePage);

  handleloadPageComments = () => {
    this.setState(
      ({ activePage }) => ({ activePage: activePage + 1 }),
      () => {
        this.fecthComments().then(comments => {
          this.setState(prevState => ({
            comments: [...prevState.comments, comments],
          }));
        });
      },
    );
  };

  handlePageChange(activePage) {
    this.setState({ activePage }, () => {
      this.fecthComments().then(comments => {
        this.setState({
          comments: [comments],
        });
      });
    });
  }

  render() {
    const { loading, comments } = this.state;
    return (
      <section>
        <h1>Comments</h1>
        {loading && <div>loading...</div>}
        <div>
          <ul className="ImageGallery">
            {comments.map(comment =>
              comment.data.data.map(dat => {
                return (
                  <li className="ImageGalleryItem" key={dat.id}>
                    <span> {dat.name}</span>
                    <span> {dat.text}</span>
                  </li>
                );
              }),
            )}
          </ul>

          <Button
            type="button"
            label="Load more..."
            width="140px"
            whenClicked={this.handleloadPageComments}
          />
          <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
      </section>
    );
  }
}
