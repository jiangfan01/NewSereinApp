import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "http://192.168.31.165:3000"

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

service.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('Axios错误：', error);
        return Promise.reject(error);
    }
);

service.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers['token'] = token;
        }

        return config;
    },
    (error) => {
        console.error('请求错误：', error);
        return Promise.reject(error);
    }
);


export default service;
