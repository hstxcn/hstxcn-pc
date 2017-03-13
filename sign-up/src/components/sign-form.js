import React, { Component } from 'react';
import axios from 'axios';
import TextInput from './text-input.js';
import SingleCheckbox from './single-checkbox';
import './sign-form.css';

class SignForm extends Component {
  constructor(props) {
    super(props);
    const isNotEmpty = (value) => !(value.length === 0 || !value.trim());
    this.formConfig = [
      {
        id: 0,
        inputName: 'phone_number',
        label: '手机:',
        type: 'text',
        value: '',
        validator: (value) => /^1[0-9]{10}$/.test(value),
        trans: (value) => value,
        error: '手机号格式不正确'
      },
      {
        id: 1,
        inputName: 'email',
        label: '邮箱:',
        type: 'text',
        value: '',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        trans: (value) => value,
        error: '邮箱格式不正确'
      },
      {
        id: 2,
        inputName: 'name',
        label: '名字:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '名字不可为空'
      },
      {
        id: 3,
        inputName: 'description',
        label: '个人简介:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '个人简介不可为空'
      },
      {
        id: 4,
        inputName: 'major',
        label: '专业:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '专业不可为空'
      },
      {
        id: 5,
        inputName: 'imagelink',
        label: '图集链接:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '图集链接不可为空'
      },
      {
        id: 6,
        inputName: 'tag',
        label: '风格（以\'/\'隔开）:',
        type: 'text',
        value: '',
        validator: (value) => value.split('/').reduce((acc, val) => {
          return acc && isNotEmpty(val);
        }, true),
        trans: (value) => value.split('/'),
        error: '风格格式不正确'
      },
      {
        id: 7,
        inputName: 'sex',
        label: '性别:',
        type: 'SingleCheckbox',
        value: '1',
        values: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '0'
          }
        ],
        validator: (value) => true,
        trans: (value) => value
      }
    ];
    this.state = this.formConfig.reduce((acc, val) => {
      acc[val.inputName] = val.value;
      return acc;
    }, {});
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormChange(state) {
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    const valid = this.formConfig.reduce((acc, val) => {
      return acc && val.validator(this.state[val.inputName]);
    }, true);
    if(valid) {
      const form = this.formConfig.reduce((acc, val) => {
        acc[val.inputName] = val.trans(this.state[val.inputName]);
        return acc;
      }, {});
      axios({
        method: 'post',
        url: '/api/register',
        data: form
      }).then((res) => {
        //TODO:do something here
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  render() {
    let formList = this.formConfig.map((form) => {
      switch (form.type) {
      case 'text':
        return (
          <TextInput
            key={form.id}
            validator={form.validator}
            inputName={form.inputName}
            value={this.state[form.inputName]}
            label={form.label}
            onValueUpdate={this.handleFormChange}
          />);
      case 'SingleCheckbox':
        return (
          <SingleCheckbox
            key={form.id}
            inputName={form.inputName}
            values={form.values}
            value={form.values[0].value}
            onValueUpdate={this.handleFormChange}
          />
        );
      default:
        return (
          <div
            key={form.id}
          >Unexpected type</div>
        );
      }
    });
    return (
      <div className="sign-form">
        <form onSubmit={this.handleSubmit}>
          {formList}
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default SignForm;
