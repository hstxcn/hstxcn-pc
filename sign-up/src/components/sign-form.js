import React, { Component } from 'react';
//import axios from 'axios';
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
        error: '手机号格式不正确'
      },
      {
        id: 1,
        inputName: 'email',
        label: '邮箱:',
        type: 'text',
        value: '',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        error: '邮箱格式不正确'
      },
      {
        id: 2,
        inputName: 'name',
        label: '名字:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        error: '名字不可为空'
      },
      {
        id: 3,
        inputName: 'description',
        label: '个人简介:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        error: '个人简介不可为空'
      },
      {
        id: 4,
        inputName: 'major',
        label: '专业:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        error: '专业不可为空'
      },
      {
        id: 5,
        inputName: 'imagelink',
        label: '图集链接:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
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
        error: '风格格式不正确'
      },
      {
        id: 7,
        inputName: 'gender',
        label: '性别:',
        type: 'SingleCheckbox',
        value: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '0'
          }
        ],
      }
    ];
    this.state = {
      formInfo: {
        phone_number: '',
        name: '',
        description: '',
        sex: true,
        images: new Array(String),
        major: '',
        imagelink: '',
        school: '',
        styles: new Array(String),
        categories: new Array(String)
      }
    };
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
            value={form.value}
            label={form.label}
          />);
      case 'SingleCheckbox':
        return (
          <SingleCheckbox
            key={form.id}
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
        {formList}
      </div>
    );
  }
}

export default SignForm;
