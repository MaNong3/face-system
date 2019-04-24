import React, { Component } from 'react';
import {lookResume} from '@/services'
import { Table , Divider} from 'antd';
const { Column } = Table;
export default class ResumeList extends Component {
    constructor(props){
        super(props);
        this.state={
            allResumelist:[]
        }
    }
    componentDidMount(){
       lookResume().then(res=>{
         this.setState({
           allResumelist:res.data.data
         })
       })
    }
  delete=()=>{
    console.log(99555)
  }
  render() {
      const {allResumelist} = this.state;
    return (
      <div>
           <Table dataSource={allResumelist}>
            <Column
              title="简历id"
              dataIndex="jianli_id"
              key="id"
            />
            <Column
              title="简历名字"
              dataIndex="jianli_name"
              key="name"
            />
            <Column
              title="简历内容"
              dataIndex="jianli_content"
              key="content"
            />
             <Column
              title="简历类型"
              dataIndex="jianli_type"
              key="type"
            />
             <Column
              title="上传时间"
              dataIndex="jianli_time"
              key="time"
            />
             <Column
              title="删除简历"
              key="action"
              render={(text, record) => (
                <span>
                  <a href="javascript:;" onClick={this.delete(1)}>删除</a>
                </span>
            )}
    />
          </Table>
      </div>
    )
  }
}
