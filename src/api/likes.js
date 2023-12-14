import request from "../utils/request";

export function newLike(data) {
    return request({
        url: '/likes',
        method: 'post',
        data
    });
}