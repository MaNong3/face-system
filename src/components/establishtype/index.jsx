/*
 * @Author: hanxiaowei 
 * @Date: 2019-03-30 08:50:48 
 * @Last Modified by: hanxiaowei
 * @Last Modified time: 2019-04-02 15:20:31
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import "./index.css"
import { Button,Select,Table} from 'antd';
import {getExamType,exam,deletExam} from '@/services'
const Option = Select.Option;

class Type extends Component {
    constructor(){
        super()
        this.state = {
          selectedRowKeys: [], 
          loading: false,
            list:[],
            del:[],
            datas:[],
            columns:[{
              title: '类型',
              dataIndex: 'exam_type',
              key: 'exam_id',
              render: text => <a href="javascript:;">{text}</a>,
            }, {
              title: '问题',
              dataIndex: 'exam_name',
              key: 'exam_name',
            }, {
              title: '答案',
              dataIndex: 'exam_answer',
              key: 'exam_answer',
            }],
        }
        this.handleChange=this.handleChange.bind(this)
    }
    start(){
      let str;
      // this.setState({ loading: true });    
      const {datas,del}=this.state;
      function filters(datas,del){
        let flags=datas.some(item=>{
          del.some(itm=>{
            if(item.exam_name == itm.exam_name){
              str=JSON.parse(JSON.stringify(datas));
              str = str.filter(e=>e.exam_name!=itm.exam_name);
              filters(str,del);
              return true;
            }else{
              return false;
            }
          })
        });
        if(!flags){
          return str;
        }
      }
      filters(datas,del)
      str.forEach(i=>{
        deletExam(i.exam_name).then(res=>{
            console.log(res.data)
        })
      })
      
      this.setState({
          datas:str,
          loading: true
      })
      setTimeout(() => {
        this.setState({
          selectedRowKeys: [],
          loading: false,
        });
      }, 500);
    }
  
    onSelectChange = (selectedRowKeys,selectedRows) => {
      console.log('selectedRowKeys changed: ', selectedRows);
      this.setState({ 
        selectedRowKeys,
        del:[...selectedRows]
      })
    }

    handleChange(value,text) {
      const {add,data}=this.props;
      console.log(value)
      let arr=[];
      data.forEach(item=>{
        if(item.exam_id===value){
          arr.push(item)
        }
      })
      
      this.setState({
        datas:arr
      })
      // console.log(arr)
    }
    componentDidMount(){
      const {add}=this.props;
      getExamType().then(res=>{
        // console.log(res.data.data)
        this.setState({
            list:res.data.data
        })
      })
      
      exam().then(res=>{
        // console.log(res.data.data)
        add(res.data.data)
          this.setState({
            datas:res.data.data
        })
      })
    }
    render() {
        const {list,columns,datas, loading, selectedRowKeys}=this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
        <div>
            <b>选择面试类型：</b>
            <Select defaultValue="请选择类型" style={{ width: 120 }} onChange={this.handleChange}>
                {
                    list.map((item,index)=>{
                        return <Option value={item.exam_id} key={index}>{item.exam_name}</Option>
                    })
                }
            </Select>
            <Table  rowSelection={rowSelection} columns={columns} dataSource={datas}/>
            
            <div className='edits'>
              <Button className='edit' type="primary">编辑</Button>
              <Button className='default' disabled={!hasSelected} loading={loading}  type="danger" onClick={()=>{
                this.start()
              }}>删除</Button>
            </div>

        </div>
        )
    }
}
const storeDataProps=(state)=>{
  // console.log(state)
  return state.exam
}
const mapDispatch=(dispatch)=>{
  return {
      add(payload){
          dispatch({type:'add',payload})
      }
  }
}
export default connect(storeDataProps,mapDispatch)(Type)
