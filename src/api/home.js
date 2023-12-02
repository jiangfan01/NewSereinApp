import request from '../utils/request'

// 查询列表
export function fetchHomeList(params) {
    return request({
        url: '/home',
        method: 'get',
        params
    });
}
