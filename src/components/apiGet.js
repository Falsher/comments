import React, { Component } from 'react';
import Button from './button';
import './css/listCommetns.css';
import apiService from './apiService';
import Pagination from 'react-js-pagination';
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    activePage: 1,
    totalPage: 0,
  };

  componentDidMount() {
    this.fecthComments().then(comments =>
      this.setState({
        comments: comments.data.data,
        totalPage: comments.data.last_page,
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
            comments: [...prevState.comments, ...comments.data.data],
          }));
        });
      },
    );
  };

  handlePageChange(activePage) {
    this.setState({ activePage }, () => {
      this.fecthComments().then(comments => {
        this.setState({
          comments: comments.data.data,
        });
      });
    });
  }

  render() {
    const { loading, comments, totalPage } = this.state;
    console.log(comments);
    return (
      <section className="sectionCommentGallery">
        <h1>Comments</h1>
        {loading && <div>loading...</div>}
        <div>
          <ul className="CommentGallery">
            {comments.map(comment => {
              return (
                <li className="CommentGalleryItem" key={comment.id}>
                  <p>
                    Name:
                    <span> {comment.name}</span>
                  </p>
                  <p>
                    Text:
                    <span> {comment.text}</span>
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="navigation">
            <div>
              {totalPage !== this.state.activePage && (
                <Button
                  className="buttonGallery"
                  type="button"
                  label="Load more..."
                  width="140px"
                  whenClicked={this.handleloadPageComments}
                />
              )}

              <Pagination
                className="paginationGallery"
                activePage={this.state.activePage}
                itemsCountPerPage={1}
                totalItemsCount={totalPage}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
