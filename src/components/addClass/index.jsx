import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import {addClass} from '@/services'

import "./index.css"
import { message } from 'antd';
export class index extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    value:"",
    name:"",
    study:""
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    const {name,value,study}=this.state
    console.log(name,value,study)
    if(name & value && study!==""){
      addClass({
        room_num:value,
        room_name:name,
        user_identify:"管理员",
        user_id:"heinan",
        room_id:study
      }).then(res=>{
        if(res.data.code===0){
          message.success('插入成功')
        }
      })
    }else{
      message.error('参数有误')
    }
   
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state
    return (
      <div>
        <div className="detail">
        <h3>添加班级</h3>
        <Button type="primary" onClick={this.showModal}>
         +
        </Button>
        <Modal
          title="添加班级"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p className="input">
          <input type="text" placeholder="请输入你的学习阶段"value={this.state.study} onChange={(e)=>{
             this.setState({
              study:e.target.value,
            })
          }}/>
          <input type="text" placeholder="请输入教室名字"value={this.state.name} onChange={(e)=>{
             this.setState({
              name:e.target.value,
            })
          }}/>
          <input type="text" placeholder="请添加你的班级" value={this.state.value} onChange={(e)=>{
             this.setState({
              value:e.target.value,
            })
          }}/></p>
        </Modal>
      </div>
      </div>
    )
  }
}

export default index
