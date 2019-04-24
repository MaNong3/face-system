import React, { Component } from 'react'
import { getAllClass,deletClass} from '@/services'
import "./index.css"
export class index extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      editing: false,
    }
  }
  deletClass(item){
    let datas=this.state.data.filter(items=>{
      return items!==item
    })
    this.setState({
      data: datas
    })
    const {room_num,room_name,user_id,room_id,user_identify}=item
    deletClass({
      room_num,room_name,user_id,room_id,user_identify
    }).then(res=>{
      console.log(res)
    })
  }
  componentDidMount() {
    getAllClass().then(res => {
      this.setState({
        data: [...res.data.data]
      })
    })
  }
  render() {
    const { data } = this.state
    console.log(data)
    return (
      <div className="table">{
        data.length && data.map((item,index) => {
          return <ul key={index}>
            <li>层次：<b>{item.room_id}</b></li>
            <li> 班级：<b>{item.room_name}</b></li>
            <li> 教室号：<b>{item.room_num}</b></li>
            <li>用户ID：<b>{item.user_id}</b></li>
            <li>身份：<b> {item.user_identify}</b></li>
           <li onClick={()=>{
                this.deletClass(item)
           }}><button>删除</button></li>
          </ul>
        })
      }
      </div>
    )
  }
}

export default index
