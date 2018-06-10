/**
 *
 * create by Xzzzzz in 2018/06/10
 * @copyright by syszxyy
 *
 */


 /**
  * rollbar 是一款错误追踪调试的工具. 在浏览器里面埋入 rollbar sdk 能够方便的进行错误调试追踪.
  */

import Rollbar from 'rollbar';

// Track error by rollbar.com

if (location.host === 'preview.pro.ant.design') {
  Rollbar.init({
    accessToken: '033ca6d7c0eb4cc1831cf470c2649971',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}
