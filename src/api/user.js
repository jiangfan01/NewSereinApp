import request from "../utils/request";

export function fetchMe(params) {
    return request({
        url: '/users/me',
        method: 'get',
        params
    });
}

// 历史记录
export function fetchHistories(params) {
    return request({
        url: '/users/histories',
        method: 'get',
        params
    });
}

// 点赞记录
export function fetchLikes(params) {
    return request({
        url: '/users/likes',
        method: 'get',
        params
    });
}


// 点赞记录
export function fetchLiked(params) {
    return request({
        url: `/users/liked`,
        method: 'get',
        params
    });
}