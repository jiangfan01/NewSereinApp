import request from '../utils/request'


export function sign_in(data) {
    return request({
        url: '/auth/sign_in',
        method: 'post',
        data
    });
}

export function sign_up(data) {
    return request({
        url: '/auth/sign_up',
        method: 'post',
        data
    });
}

