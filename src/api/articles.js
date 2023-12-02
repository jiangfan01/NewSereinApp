import request from '../utils/request'

// 查询列表
export function fetchArticlesList(params) {
    return request({
        url: '/articles',
        method: 'get',
        params
    });
}

// 查询单条
export function fetchArticle(id,params) {
    return request({
        url: `/articles/${id}`,
        method: 'get',
        params
    })
}


