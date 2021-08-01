import React, { Component } from 'react';

import Pagination from 'react-js-pagination';

export default class buttomPagination extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
    activePage: 1,
    pageNumber: 1,
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    console.log(`active page is ${pageNumber}`);
  }
  render() {
    return (
      <section>
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </section>
    );
  }
}
