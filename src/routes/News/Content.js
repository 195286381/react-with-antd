/**
 * 邵阳市中心医院信息科. create by 朱智伟.
 *
 */

// 使用 react 组件
import React, { Component } from 'react';

// 导出 antd 组件
import { Table, notification, Icon, Button, Modal, Carousel, Rate } from 'antd';

// 导出新闻内容组件
export default class NewsContent extends Component {
  state = {
    visible: false,
  };

  // 处理点击事件
  handleClick() {
    notification.open({
      message: 'ok',
      description: 'error',
    });

    this.setState({
      visible: true,
    });
  }

  // 渲染
  render() {
    const LoginModal = (
      <Modal
        title={'login modal'}
        visible={this.state.visible}
        onCancel={() => {
          this.setState({ visible: false });
        }}
        onOk={() => {
          if (this.state.visible === true) {
            notification.open({
              message: '控制条',
              description: '控制台已经打开了, 点击无效',
            });
            return;
          }
          this.setState(
            {
              visible: true,
            },
            () => {
              notification.open({
                message: '打开控制台成功',
              });
            }
          );
        }}
      >
        componentDemo
      </Modal>
    );

    const message = (
      <span>
        <Icon type="appstore" />&nbsp;error
      </span>
    );

    const BtnWithClick = (
      <Button type="primary" onClick={() => this.handleClick()}>
        Clcik ME
      </Button>
    );
    return (
      <div className="News-Content">
        <span>
          <Icon type="appstore" />&nbsp;请输入你的评分:&nbsp;
        </span>
        <Rate />
        <Table />
        <Carousel />
        JavaScript高级程序设计
        {/* javascript 高级程序设计 */}
        {BtnWithClick}
        <Button type="default">查询药品</Button>
        {LoginModal}
      </div>
    );
  }
}
