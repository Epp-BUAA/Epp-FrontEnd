import request from '@/utils/request.js'

export const userLogin = ({ username, password }) => {
    return request({
        method: 'post',
        url: '/api/login',
        data: {
            username: username,
            userpassword: password
        }
    })
}

export const getUserProfile = (username) => {
    return request({
        method: 'get',
        url: '/api/manage/userProfile',
        params: {
            username: username
        }
    })
}

export const getUserList = ({ keyword, page_num, page_size }) => {
    return request({
        method: 'get',
        url: '/api/manage/users',
        params: {
            keyword,
            page_num,
            page_size
        }
    })
}
