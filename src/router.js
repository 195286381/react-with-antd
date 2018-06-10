/**
 *
 * create by xzzzz in 2018/06/09
 * @copyright by syyszxyy
 *
 */


import React from 'react';

// dva 的 路由功能导入
import { routerRedux, Route, Switch } from 'dva/router';

// antd 组件导入
import { LocaleProvider, Spin } from 'antd';

// 中文国际化
import zhCN from 'antd/lib/locale-provider/zh_CN';

// dva/dynamic ???todo
import dynamic from 'dva/dynamic';

// 获取路由数据 ???todo
import { getRouterData } from './common/router';

// 认证路由
import Authorized from './utils/Authorized';

// 导入 style 样式
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

  // 动态获取 UserLayout 组件.
  const UserLayout = routerData['/user'].component;
  // 动态获取 BasicLayout 组件.
  const BasicLayout = routerData['/'].component;

  // 新增空白布局
  // const BlankLayout = routerData['/news'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>

          {/* /user 的组件为 UserLayout( UserLayout里面大有乾坤 ) */}
          <Route path="/user" component={UserLayout} />

          {/* <Route path="/new" render={props => <NewLayout {...props} />} /> */}
          {/* AuthorizedRoute 进入这个路由需要进行路由认证 */}
          {/* authority 认证信息是管理员或者用户才能够访问 */}
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />

        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}


// 导出全局的默认路由配置
export default RouterConfig;
