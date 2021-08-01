import React, { Component } from 'react';

import Pagination from 'react-js-pagination';
// import apiService from './apiService';
export default class buttomPagination extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
    activePage: 1,
    pageNumber: 1,
  };

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.searchQuery !== this.props.searchQuery) {
  //       this.setState({ comments: [], page: 1 });
  //       this.componentDidMount();
  //     } else if (prevState.page < this.state.page) {
  //       this.componentDidMount();
  //     }
  //   }

  //   componentDidMount = () => {
  //     apiService(this.state.page).then(comments =>
  //       this.setState(prevState => ({
  //         comments: [...prevState.comments, comments],
  //       })),
  //     );
  //   };
  //   handleloadPageComments = () => {
  //     this.setState(({ page }) => ({ page: page + 1 }));
  //   };
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
