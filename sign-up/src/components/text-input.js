import React, { Component } from 'react';
import './text-input.css';

class TextInput extends Component {

  validator = () => this.props.validator();

  render() {
    return (
      <div className={'single-input '+this.props.inputName}>
        <label htmlFor={this.props.inputName}>
          <span className="input-label-span">{this.props.label}</span>
          <input type='text'
                 value={this.props.value}
                 name={this.props.inputName}
          />
        </label>
      </div>
    );
  }
}

export default TextInput;
