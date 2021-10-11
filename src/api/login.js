import request from '../utils/request';
export default {
  //获取图片验证码
  getCaptcha() {
    return request({
      url: `http://localhost:8088/captcha`,
      method: 'get',
    });
  },
  //提交登录
  login(loginForm) {
    return request({
      url: `http://localhost:8088/login`,
      method: 'post',
      params: loginForm
    });
  },
}