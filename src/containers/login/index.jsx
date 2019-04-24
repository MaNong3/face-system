import React, { Component } from 'react'
import "./login.css"
import {userLogin} from '@/services'

import {setSession} from '@/utils'
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox,message } from 'antd';
const { Tab, UserName, Password, Submit } = Login;
export default class index extends Component {
  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true,
  }
  onSubmit = (err, values) => {
    if (this.state.type === 'tab1') {
      userLogin({
        username:values.username,
        password:values.password
      })
      .then(res => {
        if (res.data.code === 0) {
         message.success('登陆成功')
         setSession('token',res.data.data[0].user_token)
         setSession('user', values.username)
         console.log(this.props)
          this.props.history.replace("/home")
        } else {
          message.error(res.data.msg)
        }
      })
    }
  }
  onTabChange = (key) => {
    this.setState({
      type: key,
    });
  }
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }
  render() {
    return (
      <div className = "login">
      <div className = "login-count">
        <div className = "left">
        </div>
        <div className = "right" >
          <Login
              defaultActiveKey={this.state.type}
              onTabChange={this.onTabChange}
              onSubmit={this.onSubmit}
              >
              <Tab key="tab1" tab="登录">
              {
                  this.state.notice &&
                  <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
              }
              <UserName name="username" />
              <Password name="password" />
              </Tab>
              
              <div>
              <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>Keep me logged in</Checkbox>
              
              </div>
              <Submit >登录</Submit>
              <div>
              </div>
          </Login>
        </div>
      </div>
    </div>
    )
  }
}
