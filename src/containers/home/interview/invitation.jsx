import React, { Component } from 'react'
import {getInterview} from '@/services';
import { connect } from 'react-redux'

 class Invitation extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    componentDidMount(){
    
       this._getInterview()
    }
    _getInterview(){
        getInterview().then(res=>{
           // console.log(res.data.data)
            this.props.update(res.data.data)
            this.setState({
                data:res.data.data
            })
        })
    }
  render() {
      const {data}=this.state;
      //console.log(this.props)
    return (
      <div>
        <p>
        邀约公司：{data.invitation_company}
        </p>
        <p>
        被邀人：{data.interview_name}
        </p>
        <p>
        面试岗位：{data.interview_id}
        </p>  
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

export default connect( mapStateToProps, mapDispatchToProps)(Invitation)