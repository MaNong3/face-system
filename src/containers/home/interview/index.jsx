import React, { Component } from 'react'
import { Timeline, Icon } from 'antd';
import RouteView from 'router'
export default class Interview extends Component {
  render() {
      const {routers}=this.props;
    return (
    
      <div className='interview'>
            <div className='left'>
                <RouteView routers={routers}></RouteView>
            </div>
            <div className='right'>
                <Timeline mode="right">
                    <Timeline.Item>邀约面试</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">邀约公司</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">面试打卡</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">面试反馈</Timeline.Item>
                </Timeline>
            </div>
      </div>

    )
  }
}
