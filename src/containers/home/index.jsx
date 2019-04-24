import React, { Component } from 'react'
import './index.css'
import { Layout, Menu, Breadcrumb, Icon,Avatar,message} from 'antd';
import Rindex from 'router'
import {NavLink} from "react-router-dom"
const {  Content, Sider,} = Layout;
const SubMenu = Menu.SubMenu;
export default class index extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  back(){
    window.sessionStorage.removeItem('token');
    message.success('退出成功')
    this.props.history.push("/login");
  }
  render() {
    const {routers}=this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="head">
            <Avatar size={64} icon="user" />
            <p>用户头像</p>
          </div>
        
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={["/login"]}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>试题</span></span>}
            >
                 <Menu.Item key="3" >
                  <NavLink to='/home/establish'>
                    创建面试题
                    </NavLink>
                </Menu.Item>
              <Menu.Item key="4">
              <NavLink to='/home/establishtype'>
               面试题分类
              </NavLink>
              </Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team"/><span>面试管理</span></span>}
            >
              {/* <Menu.Item key="6"><NavLink to="/home/interview">面试管理</NavLink></Menu.Item> */}
              <Menu.Item key="6"><NavLink to="/home/invitation">邀约面试</NavLink></Menu.Item>
              <Menu.Item key="7"><NavLink to="/home/card">面试打卡</NavLink></Menu.Item>
              <Menu.Item key="8"><NavLink to="/home/company">面试公司</NavLink></Menu.Item>
              <Menu.Item key="9"><NavLink to="/home/feedback">面试反馈</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="team" /><span>简历管理</span></span>}
            >
              <Menu.Item key="8"><NavLink to='/home/resumeUpload'>上传</NavLink></Menu.Item>
              <Menu.Item key="9"><NavLink to='/home/resumeList'>查看</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="team"/><span>班级管理</span></span>}
            >
              <Menu.Item key="13"><NavLink to="/home/addClass">添加班级</NavLink></Menu.Item>
              <Menu.Item key="14"><NavLink to="/home/lookClass">查看班级</NavLink></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={<span><Icon type="team"/><span>用户管理</span></span>}
              >
              <Menu.Item key="15" onClick={()=>{
                  this.props.history.push("/home/showUser")
              }}>展示用户</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={<span><Icon type="team"/><span>退出登录</span></span>}
              >
              <Menu.Item key="14" onClick={()=>{
                this.back()
              }}><b>退出</b></Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="one" style={{ padding: 24, background: '#fff', minHeight: 560 }}>
                <Rindex routers={routers}>

                </Rindex>
            </div>
          
          </Content>
         
        </Layout>
      </Layout>
    )
  }
}







