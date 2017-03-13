import React, { Component } from 'react';
import './text-input.css';

class TextInput extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    //TODO:check the validator and show it
    this.props.onValueUpdate({
      [this.props.inputName]: value
    });
  }
  render() {
    return (
      <div className={'single-input '+this.props.inputName}>
        <label htmlFor={this.props.inputName}>
          <span className="input-label-span">{this.props.label}</span>
          <input type='text'
                 defaultValue={this.props.value}
                 onChange={(e) => this.handleChange(e.target.value)}
                 name={this.props.inputName}
          />
        </label>
      </div>
    );
  }
}

export default TextInput;
