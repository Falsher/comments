import React, { Component } from 'react';
import Button from './button';
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ comments: [], page: 1 });
      this.componentDidMount();
    } else if (prevState.page < this.state.page) {
      this.componentDidMount();
    }
  }

  componentDidMount() {
    fetch(
      `https://jordan.ashton.fashion/api/goods/30/comments?page=${this.state.page}`,
    )
      .then(response => response.json())
      .then(comments =>
        this.setState(prevState => ({
          comments: [...prevState.comments, comments],
          needToScroll: true,
        })),
      );
  }
  handleloadPageComments = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  render() {
    const { loading, comments } = this.state;
    return (
      <section>
        <h1>Comments</h1>
        {loading && <div>loading...</div>}
        <div>
          <ul className="ImageGallery">
            {comments.map(comment =>
              comment.data.map(dat => {
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
        </div>
      </section>
    );
  }
}
