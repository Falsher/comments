import React, { Component } from 'react';

import apiService from './apiService';
import Pagination from 'react-js-pagination';
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    clickButton: false,
    activePage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ comments: [], activePage: 1 });
      this.componentDidMount();
    } else if (prevState.activePage < this.state.activePage) {
      this.componentDidMount();
    }
  }

  componentDidMount = () => {
    return apiService(this.state.activePage).then(comments =>
      this.setState({
        comments: [comments],
      }),
    );
  };

  handlePageChange(pageNumber) {
    const activePage = pageNumber;
    this.setState({ activePage });
    console.log(this.state.activePage);
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
