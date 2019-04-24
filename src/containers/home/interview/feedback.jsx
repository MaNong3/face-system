/*
 * @Author: hanxiaowei 
 * @Date: 2019-03-29 20:51:19 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-04-01 21:00:05
 */
import React, { Component } from 'react'
import { Button,message } from 'antd';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {setFeedback} from '@/services'
import {getSession} from '@/utils'
import { connect } from 'react-redux'
import "./index.css"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Feedback extends Component {
    constructor(){
        super()
        this.state = {
            feed_context:'',
            user_id:getSession('user_id'),
            editorState: EditorState.createEmpty(),
            one: EditorState.createEmpty()
        }
    }
    handleChange=(value,text)=> {
        //console.log(value,text.props.children)
        this.setState({
            exam_id:value,
            exam_type:text.props.children
        })
    }
    onEditorStateChange=(editorState)=>{
        this.setState({ editorState })
    }
    onEditorState=(one)=> {
        this.setState({ one })
    }
    componentDidMount(){
     
    }
    submit=()=>{
      const { one} = this.state;
        let stem=draftToHtml(convertToRaw(one.getCurrentContent()));
        //console.log(stem)
       // console.log(this.props)
        const {user_id,invitation_company}=this.props.list;
        setFeedback({
          user_id:user_id,
          company:invitation_company,
          feed_context:stem
        }).then(res=>{
          if(res.data.code===0){
            message.success('反馈成功！')
          }else{
            message.error('反馈失败！')
          }
        })
    } 
    render() {
        return (
        <div>
            <h2>反馈:</h2>
            <Editor
                one={this.state.one}
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorState}
            />
            <Button type="primary" className='btn' onClick={this.submit}>提交</Button>
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

export default connect( mapStateToProps, mapDispatchToProps)(Feedback)