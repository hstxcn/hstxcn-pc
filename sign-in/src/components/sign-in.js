import React, { Component } from 'react';
import BaseForm from './base-form';
import './inputs.css';
import './sign-in.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.formConfig = [
      {
        id: 0,
        inputName: 'email',
        label: '邮箱',
        type: 'text',
        value: '',
        placeholder: '',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        trans: (value) => value,
        error: '邮箱格式不正确'
      },
      {
        id: 1,
        inputName: 'password',
        label: '密码',
        type: 'password',
        value: '',
        placeholder: '',
        validator: (value) => /^([a-zA-Z0-9_@*#]{8,15})$/.test(value),
        trans: (value) => value,
        error: '密码格式不正确'
      },
    ];
  }
  render() {
    return (
      <div className="sign-in">
        <BaseForm
          formConfig={this.formConfig}
          request={{
            url: '/api/login',
            method: 'post',
            then: (res) => console.log(res),
            error: (err) => console.log(err)
          }}
        />
      </div>
    );
  }
}

export default SignIn;
