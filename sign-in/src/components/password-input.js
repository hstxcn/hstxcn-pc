import React, { Component } from 'react';
import BasicTextInput from './basic-text-input';
import './text-input.css';

class PasswordInput extends Component {

  render() {
    const {...allProps} = this.props;
    return (
      <BasicTextInput
        type="password"
        {...allProps}
      />
    );
  }
}

export default PasswordInput;
