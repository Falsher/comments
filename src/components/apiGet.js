import React, { Component } from 'react';
import Button from './button';
import Pagination from 'react-js-pagination';
import apiService from './apiService';
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
    activePage: 1,
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ comments: [], page: 1 });
      this.componentDidMount();
    } else if (prevState.page < this.state.page) {
      this.componentDidMount();
    }
  }

  componentDidMount = () => {
    apiService(this.state.page).then(comments =>
      this.setState(prevState => ({
        comments: [...prevState.comments, comments],
      })),
    );
  };
  handleloadPageComments = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    console.log(`active page is ${pageNumber}`);
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
