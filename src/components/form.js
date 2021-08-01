import React, { Component } from 'react';
import './css/form.css';
class Form extends Component {
  state = {
    name: '',
    text: '',
  };

  hadleInputChange = e => {
    this.setState({ name: e.currentTarget.value });
  };
  handleText = e => {
    this.setState({ text: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.text);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
    fetch('https://jordan.ashton.fashion/api/goods/30/comments', options)
      .then(res => res.json())
      .then(console.log);

    this.reset();
  };
  reset = () => {
    this.setState({ name: '' });
    this.setState({ text: '' });
  };

  render() {
    return (
      <form className="formFilling" onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            className="inputContact"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.hadleInputChange}
          />
        </label>
        Text
        <textarea
          className="inputContact"
          value={this.state.text}
          onChange={this.handleText}
        ></textarea>
        <button className="buttonAdd" type="submit">
          Add comment
        </button>
      </form>
    );
  }
}
export default Form;
