import request from '../utils/request'

// 查询列表
export function fetchCategoriesList(params) {
    return request({
        url: '/categories',
        method: 'get',
        params
    });
}
