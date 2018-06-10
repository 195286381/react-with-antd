/**
 * 使用 localStorage 存储认证信息. 在真实项目可能会从服务器发送.
 */

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

// 设置认证信息
export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
