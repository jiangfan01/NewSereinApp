import request from "../utils/request";

export function newHistories(data) {
    return request({
        url: '/histories',
        method: 'post',
        data
    });
}