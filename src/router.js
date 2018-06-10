/**
 *
 * create by xzzzz in 2018/06/09
 * @copyright by syyszxyy
 *
 */


import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

// 连接路由
const { ConnectedRouter } = routerRedux;

// 认证路由
const { AuthorizedRoute } = Authorized;

// 设置默认的加载组件
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

// 路由配置
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);

  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;

  // 新增空白布局
  // const BlankLayout = routerData['/news'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          {/* <Route path="/new" render={props => <NewLayout {...props} />} /> */}
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
          {/* <Route path="/test" component={Test} /> */}
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}


// 导出全局的默认路由配置
export default RouterConfig;
