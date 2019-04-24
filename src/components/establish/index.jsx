/*
 * @Author: hanxiaowei 
 * @Date: 2019-03-29 20:51:19 
 * @Last Modified by: hanxiaowei
 * @Last Modified time: 2019-04-01 09:42:50
 */
import React, { Component } from 'react'
import "./index.css"
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button,Select,message } from 'antd';

import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {getExamType,addExam} from '@/services'
import {getSession} from '@/utils'
// import { array } from 'prop-types';

const Option = Select.Option;
export default class index extends Component {
    constructor(){
        super()
        this.state = {
            exam_id:'',
            exam_name:'',
            exam_type:'',
            user_id:getSession('user_id'),
            exam_answer:'',
            editorState: EditorState.createEmpty(),
            one: EditorState.createEmpty(),
            list:[],

        }
        this.submit = this.submit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onEditorState=this.onEditorState.bind(this)
        this.onEditorStateChange=this.onEditorStateChange.bind(this)
    }
    handleChange(value,text) {
        console.log(value,text.props.children)
        this.setState({
            exam_id:value,
            exam_type:text.props.children
        })
    }
    onEditorStateChange(editorState) {
        this.setState({ editorState })
    }
    onEditorState(one) {
        this.setState({ one })
    }
    componentDidMount(){
        getExamType().then(res=>{
            console.log(res.data.data)
            this.setState({
                list:res.data.data
            })
        })
        // console.log(this.state.user_id)
    }
    submit() {
        const { editorState ,one} = this.state;
        let stem=draftToHtml(convertToRaw(one.getCurrentContent()));
        let answer=draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(stem,answer)
        const { exam_id,exam_type,user_id } = this.state;
        if(exam_id==='' || exam_type===''){
            return  message.error('试题添加失败')
        }else{
            addExam({
                exam_id,
                exam_name:stem,
                exam_type,
                user_id,
                exam_answer:answer
            }).then(res => {
                if (res.data.code === 0) {
                    message.success('试题添加成功')
                }
            })
        }
        
    }
    render() {
        const {list}=this.state;
        return (
        <div>
            this is establish
            <h2>题干:</h2>
            <Editor
                one={this.state.one}
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorState}
            />
            <h2>内容:</h2>
            <Editor
                editorState={this.state.editorState}
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
            <b>选择面试类型：</b>
            <Select defaultValue="请选择类型" style={{ width: 120 }} onChange={this.handleChange}>
                 {
                     list.map((item)=>{
                         return <Option value={item.exam_id}>{item.exam_name}</Option>
                     })
                 }
            </Select>

            <Button type="primary" className='btn' onClick={this.submit}>提交</Button>
        </div>
        )
    }
}
