import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Pagination from 'react-js-pagination';
// require('bootstrap/less/bootstrap.less');
class PaginationComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange(page) {
    console.log(`active page is ${page}`);
    this.setState({ activePage: page });
  }

  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default PaginationComment;
