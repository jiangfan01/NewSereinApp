import request from '../utils/request'

// 查询列表
export function fetchCoursesList(params) {
    return request({
        url: '/courses',
        method: 'get',
        params
    });
}

// 查询单条
export function fetchCourses(id,params) {
    return request({
        url: `/courses/${id}`,
        method: 'get',
        params
    })
}

