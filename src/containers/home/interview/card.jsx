import React, { Component } from 'react'
import {updateCard,getUserInfo,saveUploadCard,getInterview} from '@/services'
import { Upload, message, Button, Icon} from 'antd';
import './index.css'
import { connect } from 'react-redux'
 class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileList: [{
                 uid: '-1',
                 name: 'xxx.png',
                 status: 'done',
                 url: 'http://www.baidu.com/xxx.png',
            }],
            file:{},
            userInfo:[],
            fileUrl:'',
            data:{}
        }
    }

    componentDidMount(){
      getUserInfo().then(res=>{
        //console.log(res)
        this.setState({
          userInfo:res.data.data
        })
       
      })
      getInterview().then(res=>{
        // console.log(res.data.data)
         this.props.update(res.data.data)
         this.setState({
             data:res.data.data
         })
     })
    }

    handleChange = (info) => {
            let fileList = info.fileList;
            fileList = fileList.slice(-2);
            fileList = fileList.map((file) => {
             // console.log(file)
              if (file.response) {
                file.url = file.response.url;
              }
              return file;
            });
            fileList = fileList.filter((file) => {
              if (file.response) {
                return file.response.status === 'success';
              }
              return false;
            });

            this.setState({ fileList });
    }; //上传文件时的状态

    handleReturn =(file,fileList)=>{
        this.setState({file,fileList})
    }; //接收file对象

    handleRemove =()=>{
        this.setState({file:{}})
    }; //移除file对象

    handleUpLoadBtn = ()=>{
        let {file} = this.state;
        if(JSON.stringify(file) === "{}"){
            message.warning('未上传图片！')
        }else if(JSON.stringify(file) !== "{}"){
          const {fileUrl,userInfo}=this.state
          saveUploadCard({
            params:{
              user_id:userInfo.user_id,
              user_identify:userInfo.user_identify,
              path:fileUrl
            }
          }).then(res=>{
            if(res.data.code===0){
              message.success("打卡信息存储成功！");
           }else{
              message.error(res.data.Msg);
           }
          })
        }
    };  //点击确定提交file对象
    customRequest = (option)=> {
      const formData = new FormData();
      formData.append('file',option.file);
    
      updateCard(formData).then(res=>{
        //console.log(res)
       if(res.data.code===0){
          this.setState({
            fileUrl:res.data.file
          })
          message.success("打卡上传成功！");
       }else{
          message.error("打卡上传失败！");
       }
      })
  }
    render(){
        const props = {
            beforeUpload:this.handleReturn,
            onChange: this.handleChange,
            onRemove: this.handleRemove,
            multiple: true,
            customRequest:this.customRequest,

        };
        return(
            <div>
                 <Upload {...props}>
                     <p>上传图片：</p>
                     <Button>
                          <Icon type="upload" /> 上传图片
                     </Button>
                </Upload>
                <div onClick={this.handleUpLoadBtn}>
                    <Button type="primary">确定</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    update(payload) {
        dispatch({ type: "updata", payload })
    }
}
}

export default connect( mapStateToProps, mapDispatchToProps)(Card)