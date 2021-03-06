/**
 *
 * create by xzzzz in 2018/06/29
 * @copyright by syszxyy
 *
 * 说明: 整个 menu.js , 我们只需要修改 menuData 对象.
 * 请保持其他的代码不动.
 *
 */

 // 导出 isUrl 工具方法, 用于判断当前是否是 url.
import { isUrl } from '../utils/utils';

/**
 *
 * 菜单 配置路由信息
 * 非常重要的配置.
 *
 */

 //////////////////////
//// 需要配置的代码 ////
/////////////////////

const menuData = [

  // 黑板页面
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  // 表单页面
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  // 列表页面
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  // 详情页面
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  // 结果页面
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  // 异常页面
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  // HackerNews 页面
  {
    name: 'HackerNews',
    icon: 'appstore',
    path: 'news/content',
  },
  // 用户账号密码
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  // LaluLalu 页面
  {
    name: 'lalulalu',
    icon: 'user',
    path: 'lalulalu/content',
  }
];




////////////////////////
//// 以下代码无需处理 ////
//////////////////////

/**
 *
 *  func: formatter
 *
 *  说明: 这里是对菜单配置项的数据进行格式化. 修改原 MenuData 的 authority 和 path
 *
 *  格式化之前的路由信息大致如下:
 *[
 * {
 *   name: 'hackerNews',
 *   icon: 'appstore',
 *   authority: 'user',
 *   path: 'hackerNews',
 *   children: [
 *     {
 *       name: 'hotestNews',
 *       path: 'hot'
 *     },
 *   ]
 * }
 *]
 *
 *  格式化之后的路由数据如下:
 *[
 * {
 *   name: 'hackerNews',
 *   icon: 'appstore',
 *   authority: 'user',
 *   path: '/hackerNews',
 *   children: [
 *     {
 *       name: 'hotestNews',
 *       path: '/hackerNews/hot'
 *       authority: 'user',
 *     },
 *   ]
 * }
 *]
 */

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

// 导出格式化的菜单数据函数
export const getMenuData = () => formatter(menuData);
