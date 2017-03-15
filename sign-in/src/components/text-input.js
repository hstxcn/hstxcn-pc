import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';
import './text-input.css';

class TextInput extends Component {

  render() {
    const {...allProps} = this.props;
    return (
      <BasicTextInput
        type="text"
        {...allProps}
      />
    );
  }
}

export default TextInput;
