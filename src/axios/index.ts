import axios from 'axios';
import { host } from '@/presets/constants';
// 创建axios实例
const instance = axios.create({
    baseURL: `${host}`
});
// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 在响应返回后可以进行一些操作，例如统一处理成功的逻辑
        return response.data;
    },
    (error) => {
        // 在响应出现错误时可以进行一些操作，例如统一处理错误的逻辑
        // 可以根据实际情况返回一个自定义的错误对象
        return Promise.reject(error);
    }
);



export default instance;