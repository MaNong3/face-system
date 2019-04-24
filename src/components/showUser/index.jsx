import React, { Component } from 'react'
import { getUserInfo } from '@/services'
import "./index.css"
export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        getUserInfo().then(res => {
            this.setState({
                data: [...res.data.data]
            })
        })
    }
    render() {
        const data = this.state.data
        console.log(data)
        return (
            <div className="showUser">
                {
                    data.map((item, index) => {
                        return <ul key={index}>
                            <li><b>ID:{item.user_id}</b></li>
                            <li><b> 身份：{item.user_identify}</b></li>
                            <li><b> 账号{item.user_name}</b></li>
                            <li><b> 密码{item.user_pwd}</b></li>
                            
                        </ul>
                    })
                }

            </div>
        )
    }
}

export default index
