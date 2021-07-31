import React, { Component } from 'react';
export default class ApiGetComments extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
    api: 'https://jordan.ashton.fashion/api/goods/30/comments',
  };
  componentDidMount() {
    fetch(this.state.api)
      .then(response => response.json())
      .then(comments =>
        this.setState({
          comments: [comments],
        }),
      );
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
        </div>
      </section>
    );
  }
}
