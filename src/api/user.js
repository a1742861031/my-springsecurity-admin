import request from '../utils/request';

export default {
    getUserList(query, userInfo) {
        return request({
            url: `/user/${query.pageNum}/${query.pageSize}`,
            method: 'post',
            data: userInfo
        });
    },
    getUserInfoById(userId) {
        return request({
            url: `/user/${userId}`,
            method: 'get',
        });
    },
    updateUser(user) {
        return request({
            url: `/user`,
            method: 'put',
            data: user
        });
    }
}
