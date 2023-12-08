import request from "../utils/request";

export function     fetchMe(params) {
    return request({
        url: '/users/me',
        method: 'get',
        params
    });
}