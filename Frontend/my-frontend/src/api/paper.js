import request from '@/utils/request.js'

export const getPaperOutline = (paperID) => {
    return request({
        method: 'get',
        url: '/api/manage/paperOutline',
        params: {
            paper_id: paperID
        }
    })
}

export const getPaperList = ({ keyword, page_num, page_size }) => {
    return request({
        method: 'get',
        url: '/api/manage/papers',
        params: {
            keyword,
            page_num,
            page_size
        }
    })
}
