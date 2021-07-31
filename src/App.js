import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './components/form';
import GalleryComments from './components/apiGet';
// import PaginationComment from './components/pagination';

class App extends Component {
  state = {
    comments: [],
  };

  addComment = (name, text) => {
    const comment = {
      id: shortid.generate(),
      name,
      text,
    };
    this.setState(prevState => ({
      comments: [comment, ...prevState.comments],
    }));
  };

  render() {
    const comments = this.state;
    return (
      <div>
        <Form onSubmit={this.addComment} />
        <GalleryComments dataComment={comments} />
        {/* <PaginationComment onChange={this.handlePageChange} /> */}
      </div>
    );
  }
}

export default App;
