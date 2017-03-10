import React, { Component } from 'react';
import axios from 'axios';
import './sign-form.css';

class SignTab extends Component {
  handleClick = (e) => {
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
        <span className={'slider-bar '+ (this.props.signIn ? 'right':'left')}></span>
      </div>
    );
  }
}

class SignUpInfo extends Component {
  render() {
    return (
      <div className="sign-up-info">
        <div className="text">
          <p>目前摄影师注册流程为：</p>
          <p>1.在<a href="/signup">审核信息提交页面</a>提交个人信息以及摄影图集</p>
          <p>2.等待我们的人工审核</p>
          <p>3.审核结束后，我们将会给账户邮箱发送结果</p>
        </div>
      </div>
    );
  }
}

class SignInInfo extends Component {
  constructor(props) {
    super(props);
    this.valid = false;
    this.state = {
      phoneNum: '',
      password: '',
      msg: {
        // 0 - ok
        // 1 - error
        // 2 - processing
        type: 'ok',
        content: ''
      }
    };
  }
  tryLogin = () => {
    this.setState({
      msg: {
        type: 'processing',
        content: 'login...'
      }
    });
    axios.post('/api/login', {
      phone_number: this.state.phoneNum,
      password: this.state.password
    })
    .then((res) => {
      //little hack
      let d = new Date();
      d.setTime(d.getTime() + (10*60*1000));
      document.cookie = 'auth=' + res.data['auth'] + '; expires=' + d.toUTCString();
      this.setState({
        msg: {
          type: 'ok',
          content: 'success'
        }
      });
      //goto index page but,, ??how????
    })
    .catch((err) => {
      if (err.response) {
        this.setState({
          msg: {
            type: 'error',
            content: err.response.data[0]['error'][0]
          }
        });
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const msg = this.inputChecker();
    if (msg !== '') {
      this.setState({
        msg: {
          type: 'error',
          content: msg
        }
      });
      return;
    }
    this.tryLogin();
  }
  inputChecker = () => {
    const phoneRe = /1[0-9]{10}/;
    const passwordRe = /^([a-zA-Z0-9_@*#]{8,15})$/;
    if (!phoneRe.test(this.state.phoneNum)) {
      return '手机号格式不正确';
    }
    if (!passwordRe.test(this.state.password)) {
      return '密码格式不正确';
    }
    return '';
  }
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="sign-in-info">
        <form className='sign-in-form' onSubmit={this.handleSubmit}>
          <div className='input-group'>
            <input
              name="phoneNum"
              type="text"
              placeholder="手机号"
              onChange={this.handleChange} />
            <input
              name="password"
              type="password"
              placeholder="密码"
              onChange={this.handleChange} />
          </div>
          <div className={'status-bar ' + this.state.msg.type}>
            {this.state.msg.content}
          </div>
          <input
            className="submit"
            type="submit"
            value="登录" />
        </form>
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
  }
  handleMethodChange = (same) => {
    if (!same) {
      this.setState(prevState => ({
        signIn: !prevState.signIn
      }));
    }
  }
  render() {
    return (
      <div className="sign-form">
        <SignTab signIn={this.state.signIn} onMethodChange={this.handleMethodChange} />
        <div className={'slider-boxes '+(this.state.signIn?'right':'left')}>
          <SignUpInfo />
          <SignInInfo />
        </div>
      </div>
    );
  }
}

export default SignForm;
