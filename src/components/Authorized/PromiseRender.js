import React from 'react';

// Spin 是指什么? 加载动画
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {

  state = {
    component: null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // new Props enter
    this.setRenderComponent(nextProps);
  }
  // setRenderComponent 重要函数.
  // set render Component : ok or error

  setRenderComponent(props) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = target => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };


  render() {
    const Component = this.state.component;
    return Component ? (
      <Component {...this.props} />
    ) : (

      // 返回一个全局加载的 Spin
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
