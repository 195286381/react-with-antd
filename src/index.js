/**
 *
 * create by Xzzzzz in 2018/06/10
 * @copyright by sysxzyy
 *
 */

// 引入一些 polyfill, 对一些 ES5 方法进行 polyfill.
import '@babel/polyfill';
import 'url-polyfill';

// 引入 dva
import dva from 'dva';

// 注: 这里可以选择两种不同的路由标准, 如 HashHistory Or BrowserHistory
// user HashHistory
import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';

// 引入全局的dva-loading 组件.
import createLoading from 'dva-loading';

// 对时间引入moment的中文国际化
import 'moment/locale/zh-cn';


// ollvar 这个是干什么用的? todo???
import './rollbar';

// 这里的样式采用less
import './index.less';

// 第一步 毫无疑问 初始化DVA
const app = dva({
  history: createHistory(), // 这里传入 history ? 可以选择 hashHistory or browserHistory
});

// 第二步 加载 Plugin
app.use(createLoading()); // 这里加载了 dva-loading plugin , 你也可以加载其他你需要的组件

// require('./models/global').default 这个是什么语法? todo????

// 第三步 注册 全局的模块
app.model(require('./models/global').default);

// 第四步 加载 路由
app.router(require('./router').default);

// 第五步 开始
app.start('#root');

// 这里导出全局state. 注: app._store 存储着程序的 state 值.
export default app._store; // eslint-disable-line
