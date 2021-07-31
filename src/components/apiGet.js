import React, { Component } from 'react';
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    page: 1,
  };
  componentDidMount() {
    fetch(
      `https://jordan.ashton.fashion/api/goods/30/comments?page=${this.state.page}`,
    )
      .then(response => response.json())
      .then(comments =>
        this.setState({
          comments: [comments],
        }),
      );
  }
  handleloadPageComments = () => {
    console.log('hello');
    this.setState({ page: this.state.page + 1 });
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
            <button type="button" onClick={this.handleloadPageComments}>
              Показать еще
            </button>
          </ul>
        </div>
      </section>
    );
  }
}
