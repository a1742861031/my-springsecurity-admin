import axios from 'axios';
import {
    ElMessage,
    ElMessageBox
} from "element-plus";
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://localhost:8088/api',
    timeout: 5000,
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            return response.data;
        } else {
            ElMessage({
                message: response.data.msg,
                type: 'error',
            })
            throw new Error("错误");
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
