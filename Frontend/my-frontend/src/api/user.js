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
