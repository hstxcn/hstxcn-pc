import React, { Component } from 'react';
import SignIn from './sign-in';
import SignUp from './sign-up';
import './sign-form.css';

class SignTab extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onMethodChange('inactive' !== e.target.className);
  }
  render() {
    return (
      <div className='sign-tab' onClick={this.handleClick}>
        <h2 className={!this.props.signIn ? 'active':'inactive'}>
          注册
        </h2>
        <h2 className={this.props.signIn ? 'active':'inactive'}>
          登录
        </h2>
        <span className={'slider-bar '+ (this.props.signIn ? 'right':'left')} />
      </div>
    );
  }
}

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true
    };
    this.handleMethodChange = this.handleMethodChange.bind(this);
  }
  handleMethodChange(same) {
    if (!same) {
      this.setState(prevState => ({
        signIn: !prevState.signIn
      }));
    }
  }
  render() {
    return (
      <div className={'sign-form ' + (this.state.signIn ? 'in' : 'up')}>
        <SignTab signIn={this.state.signIn} onMethodChange={this.handleMethodChange} />
        <SignUp />
        <SignIn />
      </div>
    );
  }
}

export default SignForm;
