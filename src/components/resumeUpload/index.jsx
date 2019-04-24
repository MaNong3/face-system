import {
    Upload, Button, Icon, message,
  } from 'antd';
  import React, { Component } from 'react'
  import reqwest from 'reqwest';
  import './index.css';
  import {updateUrl} from '@/services'
  export default class ResumeUpload extends Component  {
    state = {
      fileList: [],
      uploading: false,
    }
  
    handleUpload = () => {
      const { fileList } = this.state;
      console.log(fileList,'fff')
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('files[]', file);
        console.log(file,'aaaa')
        let msg={
            jianli_id:file.uid,
            jianli_name:file.name,
            jianli_content:file.size,
            jianli_type:file.type,
            jianli_time:file.lastModifiedDate
        }
        updateUrl(msg).then(res=>{
            if(res.data.code===0){
                console.log(res.data.msg)
              }else{
                console.log('插入失败')
              }
          })
      });
  
      this.setState({
        uploading: true,
      });
  
      // You can use any AJAX library you like
      reqwest({
        url: '//jsonplaceholder.typicode.com/posts/',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('上传成功');
         
        },
        error: () => {
          this.setState({
            uploading: false,
          });
          message.error('上传失败');
        },
      });
    }
  
    render() {
      const { uploading, fileList } = this.state;
      const props = {
        onRemove: (file) => {
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: (file) => {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
      };
      return (
        <div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择文件
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? '正在上传' : '上传简历' }
          </Button>
        </div>
      );
    }
  };

 