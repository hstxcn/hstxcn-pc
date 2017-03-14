import React, { Component } from 'react';
import axios from 'axios';
import TextInput from './text-input';
import SingleCheckbox from './single-checkbox';
import MultiCheckbox from './multi-checkbox';
import ImageInput from './image-input';
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
        error: '格式不正确'
      },
      {
        id: 1,
        inputName: 'email',
        label: '邮箱:',
        type: 'text',
        value: '',
        validator: (value) => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value),
        trans: (value) => value,
        error: '格式不正确'
      },
      {
        id: 2,
        inputName: 'name',
        label: '名字:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 3,
        inputName: 'description',
        label: '个人简介:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 4,
        inputName: 'major',
        label: '专业:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 5,
        inputName: 'imagelink',
        label: '图集链接:',
        type: 'text',
        value: '',
        validator: isNotEmpty,
        trans: (value) => value,
        error: '不可为空'
      },
      {
        id: 6,
        inputName: 'tag',
        label: '个人标签（以\'/\'隔开）:',
        type: 'text',
        value: '',
        validator: (value) => value.split('/').reduce((acc, val) => {
          return acc && isNotEmpty(val);
        }, true),
        trans: (value) => value.split('/'),
        error: '格式不正确'
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
      },
      {
        id: 8,
        inputName: 'styles',
        label: '风格:',
        type: 'MultiCheckbox',
        value: [],
        values: [
          //TODO: use /api/blablabla/option to get info
          {
            label: '测试',
            value: 'uuid'
          },
          {
            label: '又一个测试',
            value: 'uuid222'
          }
        ],
        // validator: (value) => value.length > 0,
        validator: (value) => true,
        trans: (value) => value,
        error: '至少选择一项'
      },
      {
        id: 9,
        inputName: 'categories',
        label: '类目:',
        type: 'MultiCheckbox',
        value: [],
        values: [
          //TODO: use /api/blablabla/option to get info
          {
            label: '测试',
            value: 'uuid'
          },
          {
            label: '又一个测试',
            value: 'uuid222'
          }
        ],
        // validator: (value) => value.length > 0,
        validator: (value) => true,
        trans: (value) => value,
        error: '至少选择一项'
      },
      {
        id: 10,
        inputName: 'images',
        label: '作品:',
        type: 'ImageInput',
        value: [],
        validator: (value) => value.length > 0,
        trans: (value) => value,
        error: '不可为空'
      },
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
    //TODO: let user know it's valid or not
    // console.log(valid);
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
        //TODO: do something
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
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
            value={this.state[form.inputName]}
            onValueUpdate={this.handleFormChange}
          />
        );
      case 'MultiCheckbox':
        return (
          <MultiCheckbox
            key={form.id}
            inputName={form.inputName}
            values={form.values}
            value={this.state[form.inputName]}
            onValueUpdate={this.handleFormChange}
          />
        );
      case 'ImageInput':
        return (
          <ImageInput
            key={form.id}
            inputName={form.inputName}
            value={this.state[form.inputName]}
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
