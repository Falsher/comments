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
      <section className="sectionCommentGallery">
        <h1>Comments</h1>
        {loading && <div>loading...</div>}
        <div>
          <ul className="CommentGallery">
            {comments.map(comment =>
              comment.data.data.map(dat => {
                return (
                  <li className="CommentGalleryItem" key={dat.id}>
                    <p>
                      Name:
                      <span> {dat.name}</span>
                    </p>
                    <p>
                      Text:
                      <span> {dat.text}</span>
                    </p>
                  </li>
                );
              }),
            )}
          </ul>
          <div className="navigation">
            {comments.map(comment => {
              return (
                <div>
                  <Button
                    className="buttonGallery"
                    type="button"
                    label="Load more..."
                    width="140px"
                    whenClicked={this.handleloadPageComments}
                  />
                  <div>
                    <Pagination
                      className="paginationGallery"
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={comment.data.last_page * 10}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
