import request from '../utils/request'

// 查询单条
export function fetchChapter(id,params) {
    return request({
        url: `/chapters/${id}`,
        method: 'get',
        params
    })
}

