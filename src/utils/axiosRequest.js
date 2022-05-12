import axios from 'axios';
import store from '../store/index';
import { jsonlint } from '@/utils/jsonlint'
// import errorCode from "@/utils/errorCode.js"; // 我们后台给提供错误码提示 呜呜...

/**
 * 请求失败后的错误统一处理
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

// 创建axios实例
let instance = axios.create({
  // baseURL: process.env.VUE_APP_API_URL, // 域名 没配置因为我们是放在一个服务器下
  timeout: 1000 * 6,
  withCredentials: true, // 允许携带cookie中的参数
  transformResponse: [function transformResponse(data) {
    return jsonlint.parse(data) // jsonlint 针对javascript 不能解析超长数字类型数据转换成字符串
  }], // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
});

// 请求拦截 - 主要就是为了修改请求发出之前的请求头配置以及参数放置的位置
instance.interceptors.request.use(
  config => {
    //发请求前设置store中存储的接口请求状态
    /**
     * 设置对应接口请求状态对象
     * 然后分别在请求拦截，响应拦截中设置状态
     * 改变store中对应接口的请求状态
     */
    // console.log(config)

    store.dispatch("setLoading", {
      url: `${config.url}`,
      status: true,
    }); // 这个如果感兴趣，请查看我的vue 全局下的loading状态

    // 设置请求头
    if (config.method === "post" && !!config.params && config.params !== "") {
      config.headers = {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    }

    if (config.method === "put" && !!config.params && config.params !== "") {
      config.headers = {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    }

    if (config.method === "delete") {
      if (!!config.params && !!config.params.data) {
        config.headers = {
          'Accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8',
        }
        config.data = config.params;
        config.params = ""
      }
    }

    // 这个配置项 是接口需要验证特殊加的
    if (!!config.userid) {
      config.headers.userid = config.userid
    }

    // console.log("请求配置", config)
    return config;
  },

  error => Promise.reject(error) //正常写这里应该没啥错误的
);

// 处理返回后Loading状态，url存在正常返回，反之是异常都会关闭Loading状态
function handleResponseLoading(url) {
  if (!!url) {
    let apiUrl = url;

    if (url.indexOf("?") !== -1) {
      apiUrl = url.split("?")[0];
      // console.log(apiUrl);
    }

    // 如果成功则需要, 设置对应接口loading状态
    store.dispatch("setLoading", { url: apiUrl, status: false });
  } else {
    for (let l in store.state.Loading) {
      store.state.Loading[l] = false
    }
  }

}
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // Get Put 请求中参数时拼接到地址栏的，所以对应的接口状态中应去掉？后的参数，才能取消请求状态
    handleResponseLoading(res.config.url)

    /*
        1.服务器会出现没有请求成功但无数据的情况，所要先判断当前返回是不是空，确认返回是空则需要提示服务异常
        2. data中返回的result代表结果 0 成功请求，如果不是需要新增一个阻断 errorMsg
            用于查询 errorCode 中存储的错误提示信息，并返回给 resolve 请求的回调
    */

    let data = {};
    // console.log("拦截", res.data)
    if (!!res.data) {
      if (res.status === 200 && res.data.result === 0) {
        data = res.data;
      } else {
        // let code = errorCode.get(`${res.data.result}`);
        // data = {
        //   ...res.data,
        //   errorMsg: `${res.data.result} * ${res.data.msg ? res.data.msg : code}`
        // }
      }
    } else {
      data = {
        result: "error",
        errorMsg: `服务器网络异常，请您稍后重试！`
      }
    }

    return res.status === 200 ? Promise.resolve(data) : Promise.reject(data);
  },

  // 请求失败
  error => {
    console.log("========================>error", error)
    const { code, config, message, response } = error; // ES6 解构定义 等价于 const response = error.response、

    handleResponseLoading(config.url)
    /*
        1. 请求错误中，如果网络断开连接，也有response的存在，所以先判断是不是断网
        2. 然后开始判断有没有 response 的返回
        3. 有的话说明是请求状态的错误，则需要 codeMessage 中的提示信息（可能会根据错误码判断当前是否需要跳页面或重新登录）
        4. 没有 response 说明 连接网络超时或者发生其他暂时不清楚的错误

    */
    if (!window.navigator.onLine) { // onLine:表示是否连网，如果连网返回true,否则返回false
      // console.log("断网");
      return Promise.reject({
        errorMsg: `网络连接错误，请检查您的网络！`
      });
    } else {
      // console.log("没有断网");
      if (!!response) {
        // 请求已发出, 但是不在200的范围
        // console.log("错误返回存在response");
        const { response: { status, statusText, data: { msg = '服务器发生错误' } } } = error;
        const text = codeMessage[status] || statusText || msg;
        return Promise.reject({
          errorMsg: text
        });
      } else {
        // console.log("错误返回不存在response");
        if (code === "ECONNABORTED" && message.indexOf('timeout') !== -1)
          return Promise.reject({
            errorMsg: `网络请求超时，请检查您的网络后重试！`
          });
        return Promise.reject({
          errorMsg: `未知错误`
        });
      }
    }
  }
);

export {
  instance as axios, //通常情况下，`export`输出的变量就是本来的名字，但是可以使用`as`关键字重命名。
};
